import React, { useState } from 'react';

const ProblemItem = ({ problem }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="problem-item" onClick={() => setShowDetail(!showDetail)}>
      <h3>{problem.shortHeading}</h3>
      <p>{problem.shortDescription}</p>
      {showDetail && (
        <div className="details">
          <p>{problem.detailedDescription}</p>
          <h4>Examples:</h4>
          {problem.examples.map((ex, i) => (
            <div key={i}>
              <p>Input: {ex.input}</p>
              <p>Output: {ex.output}</p>
            </div>
          ))}
          <p><strong>Constraints:</strong> {problem.constraints}</p>
        </div>
      )}
    </div>
  );
};

export default ProblemItem;
