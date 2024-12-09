import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import CompileWindow from '../CompileWindow/CompileWindow';
import './Editor.css';

const Editor = ({ question }) => {
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState('');
  const [inputData, setInputData] = useState(question.examples[1].input); // Set default to empty
  const [isCompileWindowVisible, setCompileWindowVisible] = useState(false);
  const [compileOutput, setCompileOutput] = useState('');
  const [compileError, setCompileError] = useState('');
  const [isCustomInputVisible, setCustomInputVisible] = useState(false);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    setCode(getDefaultCode(selectedLanguage));
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const getDefaultCode = (language) => {
    switch (language) {
      case 'cpp':
        return `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, CPP!" << endl;\n    return 0;\n}`;
      case 'java':
        return `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`;
      case 'python':
        return `print("Hello, Python!")`;
      case 'javascript':
        return `console.log("Hello, JS!");`;
      default:
        return '// Write your code here...';
    }
  };

  const handleCompile  = async () => {
    
      // When custom input is visible, run with the entered input
      try {
        const response = await fetch('http://localhost:5000/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: language,
            code: code,
            input_data: inputData || '', // Use custom input
          }),
        });

        const data = await response.json();
        setCompileOutput(data.stdout);
        console.log(data.stdout||"No output");
        
        setCompileError(data.stderr || '');
        setCompileWindowVisible(true);
      } catch (error) {
        setCompileError('Compilation failed. Please check the code and try again.');
        setCompileOutput('');
        setCompileWindowVisible(true);
      }
    
  };

  const handleCustomInputClick = () => {
    setCompileWindowVisible(true); // Ensure the compile window stays visible
  };


  // const handleCompile = async () => {
  //   alert('Compile and run button clicked');
  // }

  const handleSubmit = async () => {
    alert('Submit button clicked');
  }
  
  const handleCloseCompileWindow = () => {
    setCompileWindowVisible(false);
  };

  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <div>
          <label htmlFor="language-select">Language:</label>
          <select id="language-select" value={language} onChange={handleLanguageChange}>
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
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div className="editor-footer">
        <button onClick={handleCustomInputClick} className="action-button custom-input">
          Custom Input
        </button>
        <button onClick={handleCompile} className="action-button run">
          Compile & Run
        </button>
        <button className="action-button submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <CompileWindow
        isVisible={isCompileWindowVisible}
        onClose={handleCloseCompileWindow}
        output={compileOutput}
        error={compileError}
        inputData={inputData}
        onInputChange={handleInputChange}
        isCustomInputVisible={isCustomInputVisible}
        onRun={handleCompile}
      />
    </div>
  );
};

export default Editor;
