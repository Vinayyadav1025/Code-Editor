import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./QuestionDetail.css";
import Editor from '../Editor/Editor'; // Import the Editor component

const QuestionDetail = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [leftWidth, setLeftWidth] = useState(50);

  useEffect(() => {
    fetch(`http://localhost:5002/api/questions/${questionId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.question);
      })
      .catch((error) => console.error("Error fetching question:", error));
  }, [questionId]);

  if (!question) {
    return <div className="loading">Loading...</div>;
  }

  const handleDrag = (e) => {
    const containerWidth = e.target.parentNode.offsetWidth;
    const newLeftWidth = (e.clientX / containerWidth) * 100;
    if (newLeftWidth > 10 && newLeftWidth < 90) {
      setLeftWidth(newLeftWidth);
    }
  };

  return (
    <div className="resizable-container">
      <div className="left-section" style={{ width: `${leftWidth}%` }}>
        <h3>{question?.shortHeading || "Question Title"}</h3>
        <div className="tags">
          {question?.topicTag?.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <p>{question?.detailedDescription || "Detailed description goes here."}</p>
        <h4>Examples:</h4>
        {question?.examples?.length > 0 ? (
          question.examples.map((example, index) => (
            <div key={index} className="example">
              <p>
                <strong>Input:</strong> {example.input}
              </p>
              <p>
                <strong>Output:</strong> {example.output}
              </p>
            </div>
          ))
        ) : (
          <p>No examples available.</p>
        )}
        <p>
          <strong>Constraints:</strong> {question?.constraints || "None"}
        </p>
      </div>

      <div
        className="divider"
        onMouseDown={(e) => {
          document.addEventListener("mousemove", handleDrag);
          document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleDrag);
          });
        }}
      ></div>

      {/* Right Section - Code Editor */}
      <div className="right-section" style={{ width: `${100 - leftWidth}%` }}>
        <Editor /> {/* Use the Monaco Editor component here */}
      </div>
    </div>
  );
};

export default QuestionDetail;
