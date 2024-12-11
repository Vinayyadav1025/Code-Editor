import React from 'react';
import './CompileWindow.css';

const CompileWindow = ({
  isVisible,
  onClose,
  output1,
  error1,
  output2,
  error2,
  inputData,
  onInputChange,
  isCustomInputVisible,
  onRun,
}) => {
  if (!isVisible) return null;

  return (
    <div className="compile-window-overlay">
      <div className="compile-window">
        <div className="compile-window-header">
          <span>Compilation Output</span>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="compile-window-body">
          {/* Custom Input Section */}
          { (
            <div className="input-section">
              <h4>Custom Input:</h4>
              <textarea
                value={inputData}
                onChange={onInputChange}
                placeholder="Enter your custom input here..."
              ></textarea>
            </div>
          )}
          {/* Your Output Section */}
          {!error1 ? (
          <div>
            <h4>Your Output:</h4>
            <pre className="output">{output1 || 'Error'}</pre>
          </div>):(
          (
            <div className="error">
              <h4>Error:</h4>
              <pre>{error1}</pre>
            </div>
          ))
        }
          {/* Expected Output Section */}
          <div>
            <h4>Expected Output:</h4>
            <pre className="output">{output2 || 'Please provide correct input'}</pre>
          </div>
          {/* Error Section */}
          {error2 && (
            <div className="error">
              <h4>Error:</h4>
              <pre>{error2}</pre>
            </div>
          )}
        </div>
        {/* Buttons */}
        <div className="compile-window-buttons">
          <button onClick={onRun} className="run">
            Compile & Run
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompileWindow;
