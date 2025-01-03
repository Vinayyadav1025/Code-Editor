import React, { useState, useEffect, act } from 'react';
import MonacoEditor from '@monaco-editor/react';
import CompileWindow from '../CompileWindow/CompileWindow';
import './Editor.css';
import SubmitWindow from '../SubmitWindow/SubmitWindow';

const Editor = ({ question }) => {
  const [language, setLanguage] = useState('cpp');
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState('');
  const [inputData, setInputData] = useState(question.examples[1].input); // Set default to empty
  const [isCompileWindowVisible, setCompileWindowVisible] = useState(false);
  const [compileOutput, setCompileOutput] = useState('');
  const [compileError, setCompileError] = useState('');
  const [compileExpectedOutput, setCompileExpectedOutput] = useState('');
  const [compileExpectedError, setCompileExpectedError] = useState('');
  const [isCustomInputVisible, setCustomInputVisible] = useState(false);
  const [isSubmitWindowVisible, setSubmitWindowVisible] = useState(false);
  const [status, setStatus] = useState('failed');
  const [passedTestCases, setPassedTestCases] = useState(0);
  const [passed, setPassed] = useState(false);

  //console.log(actualCode);
  
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
        return question.customCode;
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

  const handleCompile = async () => {
    const actualCode = (() => {
      const customCodeWithFunction = question.customCode.replace(
        '//Write your code here',
        question.functionCode
      );
      return customCodeWithFunction;
    })();
  
    try {
      console.log(actualCode);
      
      const response = await fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          code: code,
          actualCode: actualCode,
          input_data: inputData || '', // Use custom input
        }),
      });
  
      const data = await response.json();
      //console.log(data);
      
      if (response.ok) {
        setCompileOutput(data.codeResponse.stdout);
        //console.log(data.codeResponse.stdout);        
        setCompileError(data.codeResponse.stderr);
        //console.log(data.codeResponse.stderr);
        
        setCompileExpectedOutput(data.actualCodeResponse.stdout);
        //console.log(data.actualCodeResponse.stdout);
        console.log(data);
        
        setCompileExpectedError(data.actualCodeResponse.stderr);
        //console.log(data.actualCodeResponse.stderr);
        
      } else {
        setCompileError(data.error || 'Compilation failed. Please check the code and try again.');
        setCompileOutput('');
      }
  
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
    
    try{
      const response = await fetch('http://localhost:5000/submit', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          language:language,
          code:code,
          testCases:question.testCases
        }),
      });

      const data = await response.json();

      if(response.ok){
        setStatus(data[0].status);
        setPassedTestCases(data[1].passedTestCases);
        setPassed(data[2].passed);
        setSubmitWindowVisible(true); // Show SubmitWindow on successful submission
      }
      else{
          console.log(data.error || 'Submission failed. Please check the code and try again.');
          
      }

    }
    catch(error){
      console.error('Error:',error);
    }

  }
  
  const handleCloseCompileWindow = () => {
    setCompileWindowVisible(false);
  };

  const handleCloseSubmitWindow = () => {
    setSubmitWindowVisible(false); // Hide SubmitWindow
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
        output1={compileOutput}
        error1={compileError}
        output2={compileExpectedOutput}
        error2={compileExpectedError}
        inputData={inputData}
        onInputChange={handleInputChange}
        isCustomInputVisible={isCustomInputVisible}
        onRun={handleCompile}
      />
      <SubmitWindow
        isVisible={isSubmitWindowVisible} // Change from isSubmitWindowVisible to isVisible if not already matching prop
        onClose={handleCloseSubmitWindow}
        status={status}
        passedTestCases={passedTestCases}
        passed={passed}
      />


    </div>
  );
};

export default Editor;
