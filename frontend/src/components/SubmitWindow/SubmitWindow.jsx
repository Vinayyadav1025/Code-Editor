import React from 'react';
import './SubmitWindow.css';

const SubmitWindow = ({
  isVisible,
  onClose,
  status,
  passedTestCases,
  passed,
}) => {
  if (!isVisible) return null;

  return (
    <div className="submit-window-overlay">
      <div className="submit-window">
        <div className="submit-window-header">
          <span>Submission Result</span>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="submit-window-body">
          <div>
            <h4>Output:</h4>
            {/* <pre className="output">{status}</pre> */}
            <pre className="output">{passedTestCases}</pre>
            <pre className="output">{passed}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitWindow;
