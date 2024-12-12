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

  const { input, output, response } = status || {};
  const { stdout, stderr } = response || {};

  return (
    <div className="submit-window-overlay">
      <div className={`submit-window ${passed ? 'success-animation' : ''}`}>
        <div className="submit-window-header">
          <h3>Submission Result</h3>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="submit-window-body">
          <div>
            {passed ? (
              <>
                <div className="greet-animation">
                  🎉 Accepted! Congratulations! 🎉
                </div>
                <h3 className="success">All test cases passed</h3>
                <h4 className="totalTestCases">Total passed test cases:</h4>
                <pre className="output">{passedTestCases}</pre>
              </>
            ) : (
              <>
                {input || output || stdout || stderr ? (
                  <>
                  <h4 className='compileError'>Submittion Failed: </h4>
                    <h4>Input:</h4>
                    <pre className="input">{input || 'N/A'}</pre>
                    <h4>Your Output:</h4>
                    <pre className="stdout">{stdout || stderr || 'N/A'}</pre>
                    <h4>Expected Output:</h4>
                    <pre className="exoectedOutput">{output || 'N/A'}</pre>
                    <h4>Passed Testcases:</h4>
                    <pre
                      className={`passedTestCases ${
                        passedTestCases > 0 ? 'partial-pass' : 'error'
                      }`}
                    >
                      {passedTestCases || 0}
                    </pre>
                  </>
                ) : (
                  <>
                  <h4 className='compileError'>Compilation Error: </h4>
                  <pre className="errorOutput">{status || 'No details available'}</pre>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitWindow;
