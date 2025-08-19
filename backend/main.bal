import ballerina/http;
import ballerina/io;
import ballerina/log;
import lakpahana/firebase_realtime_database;

// --- GLOBAL VARIABLES ---
final firebase_realtime_database:FirebaseDatabaseClient firebaseClient;
// This variable will hold all the dummy data read from the local file.
json allDummyData; 

// --- INITIALIZATION ---
function init() returns error? {
    // 1. Initialize Firebase Client
    json firebaseConfigJson = check io:fileReadJson("./firebaseConfig.json");
    firebaseClient = check new (firebaseConfigJson, "./serviceAccount.json");
    log:printInfo("Firebase client initialized successfully.");

    // 2. Read the dummy-data.json file into memory at startup.
    allDummyData = check io:fileReadJson("./dummy-data.json");
    log:printInfo("Local dummy data file loaded successfully.");
}

// ===================================================================
// BALLERINA SERVICE (GET-ONLY)
// ===================================================================

service / on new http:Listener(9090) {

    // Handles the browser's preflight OPTIONS request.
    resource function options [string... path]() returns http:Response {
        http:Response response = new;
        response.statusCode = http:STATUS_OK;
        setCorsHeaders(response);
        return response;
    }

    // --- GET endpoints for fetching combined data ---
    resource function get advertisements(http:Request request) returns http:Response|error {
        return handleHybridGet(request, "advertisements");
    }
    resource function get ideas(http:Request request) returns http:Response|error {
        return handleHybridGet(request, "ideas");
    }
    resource function get students(http:Request request) returns http:Response|error {
        return handleHybridGet(request, "students");
    }
}

// SAFER Helper Function to Merge Dummy and Live Data
function handleHybridGet(http:Request request, string dbPath) returns http:Response {
    http:Response response = new;
    
    // Step 1: Get the correct section of dummy data using a 'match' statement.
    // This is a more robust method for older Ballerina versions.
    map<json> mergedData = {};
    match dbPath {
        "students" => {
            var dummyItems = allDummyData.students;
            if dummyItems is map<json> { mergedData = dummyItems.clone(); }
        }
        "ideas" => {
            var dummyItems = allDummyData.ideas;
            if dummyItems is map<json> { mergedData = dummyItems.clone(); }
        }
        "advertisements" => {
            var dummyItems = allDummyData.advertisements;
            if dummyItems is map<json> { mergedData = dummyItems.clone(); }
        }
        _ => { // Default case if path doesn't match
            log:printWarn("No matching dummy data for path: " + dbPath);
        }
    }
    
    // Step 2: Fetch live data from Firebase
    json|error liveDataResult = firebaseClient.getData(dbPath);
    
    // Step 3: Manually merge the live data into our map.
    // This is safer than using the .merge() function in older versions.
    if liveDataResult is map<json> {
        foreach var [key, value] in liveDataResult.entries() {
            mergedData[key] = value;
        }
    } else if liveDataResult is error {
        log:printError(string `Failed to get live data for ${dbPath}`, liveDataResult);
    }
    
    // Step 4: Send the combined list to the frontend
    response.statusCode = http:STATUS_OK;
    response.setPayload(mergedData);
    setCorsHeaders(response);
    return response;
}

// Helper function that manually adds the required CORS headers
function setCorsHeaders(http:Response response) {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Only GET is needed now
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}