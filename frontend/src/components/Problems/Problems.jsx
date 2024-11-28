import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link to handle navigation
import './Problems.css';


const Problems = () => {
  const [questions, setQuestions] = useState([]); // Stores all fetched questions
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Stores filtered questions
  const [selectedTopics, setSelectedTopics] = useState([]); // Selected topics for filtering
  const [selectedComplexities, setSelectedComplexities] = useState([]); // Selected complexities for filtering

  const topics = ["Array", "String", "Sorting", "Searching"]; // Example topics
  const complexities = ["Easy", "Medium", "Hard"]; // Complexity options

  // Fetch questions from the backend
  useEffect(() => {
    fetch('http://localhost:5002/api/questions')
      .then((response) => response.json())
      .then((data) => {
        // Check if data.questions is an array
        if (Array.isArray(data.questions)) {
          setQuestions(data.questions);
          setFilteredQuestions(data.questions); // By default, show all questions
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);
  

  // Filter questions based on selected topics and complexities
  useEffect(() => {
  // Debugging logs
  // console.log("Selected Topics: ", selectedTopics);
  // console.log("Selected Complexities: ", selectedComplexities);
  // console.log("All Questions: ", questions);

  // If no filters are selected, show all questions
  if (selectedTopics.length === 0 && selectedComplexities.length === 0) {
    setFilteredQuestions(questions);
  } else {
    let filtered = Array.isArray(questions) ? [...questions] : [];

    // Filter based on selected topics
    if (selectedTopics.length > 0) {
      filtered = filtered.filter((question) =>
        selectedTopics.some((topic) =>
          question.topicTag.includes(topic) // Check if any selected topic matches any tag in topicTag
        )
      );
    }

    // Filter based on selected complexities
    if (selectedComplexities.length > 0) {
      filtered = filtered.filter((question) =>
        selectedComplexities.includes(question.complexity) // Direct match for complexity
      );
    }

    // Debugging logs for filtered results
    //console.log("Filtered Questions: ", filtered);
    setFilteredQuestions(filtered);
  }
}, [selectedTopics, selectedComplexities, questions]); // Trigger effect when filters or questions change


  // Handle topic checkbox changes
  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Handle complexity checkbox changes
  const handleComplexityChange = (complexity) => {
    setSelectedComplexities((prev) =>
      prev.includes(complexity)
        ? prev.filter((c) => c !== complexity)
        : [...prev, complexity]
    );
  };

  return (
    <div className="problems">
      <div className="filter-section">
        <h3>Topics</h3>
        {topics.map((topic) => (
          <div key={topic}>
            <input
              type="checkbox"
              id={`topic-${topic}`}
              onChange={() => handleTopicChange(topic)}
            />
            <label htmlFor={`topic-${topic}`}>{topic}</label>
          </div>
        ))}
        <h3>Complexity</h3>
        {complexities.map((complexity) => (
          <div key={complexity}>
            <input
              type="checkbox"
              id={`complexity-${complexity}`}
              onChange={() => handleComplexityChange(complexity)}
            />
            <label htmlFor={`complexity-${complexity}`}>{complexity}</label>
          </div>
        ))}
      </div>

      <div className="question-list">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div key={question._id} className="question-item">
              <Link to={`/questions/${question._id}`}>
                <h4>{question.shortHeading}</h4>
                <p>{question.shortDescription}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No questions match the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Problems;
