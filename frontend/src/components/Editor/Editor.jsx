import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import "./Editor.css";

const Editor = () => {
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState("// Write your code here...");
  const [inputData, setInputData] = useState(""); // Added inputData state to capture input

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputData(event.target.value); // Handle input data change
  };

  const handleRun = async () => {
    try {
      
      const response = await fetch("http://host.docker.internal:5000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code, // Use the code written by the user
          input_data: inputData,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.stdout); // Log the output to the browser console
      // Optionally display the output in the UI
      alert(`Output: ${data.stdout}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleSubmit = () => {
    alert("Submit button clicked!");
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <div>
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div>
          <label htmlFor="theme-select">Theme:</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange}>
            <option value="vs-dark">Dark</option>
            <option value="vs-light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </div>
      </div>

      <div className="editor-container">
        <MonacoEditor
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 14,
          }}
        />
      </div>

      <div className="editor-footer">
        <input
          type="text"
          placeholder="Enter input data"
          value={inputData}
          onChange={handleInputChange}
        />
        <button onClick={handleRun} className="action-button run">
          Run
        </button>
        <button onClick={handleSubmit} className="action-button submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Editor;
