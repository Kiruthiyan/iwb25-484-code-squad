import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getData } from '../apiService'; // Fetches from your Ballerina backend
import SearchBar from './SearchBar';     // The search input component
import './StudentList.css';             // Styles for this component

// ===================================================================
// SECTION 1: REUSABLE SUB-COMPONENT for a single Candidate Card
// ===================================================================

function CandidateCard({ profile, name, city, description, phoneNo, linkedin, skills }) {
  // A fallback profile image if one isn't provided from the database
  const profileImage = profile || "/images/default-profile.png";
  
  return (
    <div className="card-container">
      <img src={profileImage} className="img" alt={`${name} profile`} />
      <h3>{name}</h3>
      <h3 className="card-city">{city || 'Location not specified'}</h3>
      <p className="card-description">{description}</p>
      <div className="contact-info">
        <span>Phone: {phoneNo || 'N/A'}</span>
        {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">View LinkedIn</a>}
      </div>
      <div className="skills">
        <h6>Skills</h6>
        <ul>{Array.isArray(skills) && skills.map((skill, index) => (<li key={index}>{skill}</li>))}</ul>
      </div>
    </div>
  );
}

CandidateCard.propTypes = {
  profile: PropTypes.string,
  name: PropTypes.string.isRequired,
  city: PropTypes.string,
  description: PropTypes.string.isRequired,
  phoneNo: PropTypes.string,
  linkedin: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// ===================================================================
// SECTION 2: MAIN COMPONENT to display the entire list
// ===================================================================
const StudentList = () => {
    const [masterList, setMasterList] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // This calculates the list of unique skills for the filter dropdown
    const uniqueSkills = useMemo(() => {
        const allSkills = masterList.flatMap(student => student.skills || []);
        return [...new Set(allSkills)].sort();
    }, [masterList]);

    // This useEffect fetches the initial data from the backend when the page loads
    useEffect(() => {
        const fetchStudentsFromBackend = async () => {
            try {
                // Fetches the combined data from the Ballerina /students endpoint
                const dataFromBackend = await getData('students');

                // Converts the Firebase object-of-objects into a usable array
                const studentArray = dataFromBackend ? 
                    Object.keys(dataFromBackend).map(key => ({
                        id: key,
                        ...dataFromBackend[key]
                    })) : [];

                // Sorts the data so the most recently submitted entries appear first
                studentArray.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

                setMasterList(studentArray);
                setFilteredStudents(studentArray); // Initially, the filtered list is the full list
            } catch (err) {
                console.error("Error fetching students from backend:", err);
                setError('Could not load candidate data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchStudentsFromBackend();
    }, []); // The empty array [] means this runs only once.

    // This useEffect handles all filtering and sorting whenever a control changes
    useEffect(() => {
        let results = [...masterList];
        const lowercasedFilter = searchTerm.toLowerCase();

        if (lowercasedFilter) {
            results = results.filter(student =>
                (student.fullName && student.fullName.toLowerCase().includes(lowercasedFilter)) ||
                (student.degree && student.degree.toLowerCase().includes(lowercasedFilter)) ||
                (student.skills && Array.isArray(student.skills) && student.skills.join(' ').toLowerCase().includes(lowercasedFilter))
            );
        }
        if (selectedSkill) {
            results = results.filter(student => student.skills && student.skills.includes(selectedSkill));
        }
        if (sortOrder) {
            results.sort((a, b) => {
                const nameA = a.fullName || '';
                const nameB = b.fullName || '';
                return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
            });
        }

        setFilteredStudents(results);
    }, [searchTerm, selectedSkill, sortOrder, masterList]);

    const handleReset = () => {
        setSearchTerm('');
        setSelectedSkill('');
        setSortOrder('');
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="search-and-list-wrapper">
            <div className="candidate-dashboard">
                <div className="section-divider-container">
                    <hr className="section-divider" />
                    <h2 className="section-title">Available Candidates for Hire</h2>
                </div>
                <div className="controls-container">
                  <div className="search-bar-wrapper">
                    <SearchBar searchTerm={searchTerm} onSearchChange={e => setSearchTerm(e.target.value)} />
                  </div>
                  <div className="filter-sort-container">
                    <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} className="filter-select">
                      <option value="">Filter by Skill</option>
                      {uniqueSkills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                    </select>
                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="sort-select">
                      <option value="">Sort by Name</option>
                      <option value="asc">Name A-Z</option>
                      <option value="desc">Name Z-A</option>
                    </select>
                    <button onClick={handleReset} className="reset-button">Reset</button>
                  </div>
                </div>

                {loading ? (
                    <div className="loading-message">Loading Talent...</div>
                 ) : filteredStudents.length > 0 ? (
                    <div className="student-list-container">
                        {filteredStudents.map(student => (
                            <CandidateCard
                              key={student.id}
                              profile={student.fileUrls?.passportPhotoUrl}
                              name={student.fullName}
                              city={student.address}
                              description={student.degree}
                              phoneNo={student.phoneNo}
                              linkedin={student.linkedin}
                              skills={student.skills || []}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-results-message">No candidates found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default StudentList;