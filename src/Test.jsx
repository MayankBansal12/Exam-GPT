import React, { useState } from 'react';

const Test = () => {
    const [speech, setSpeech] = useState(false);
    const recording = () => {
        setSpeech(true)
    }
    return (
        <div className="test-container">
            <h2>Exam Conversation</h2>
            <div className="conversation">
                <div className="chat gpt">Say "I am ready to start" whenever you are ready to start the exam</div>
                <div className="chat user">You: I am ready to start the exam</div>
                <div className="chat gpt">Good, let's begin the exam on SQL databases. Question 1: Define SQL databases and explain their purpose in data management</div>
                <div className="chat user" style={{ "textAlign": "center" }}>{!speech ? <span>Click on  <button className="material-symbols-outlined mic-btn" onClick={recording}>mic</button>  to start recording your answer</span> : "Recording..."}</div>
            </div>
            <div style={{ "width": "100%", "textAlign": "center" }}>
                <button className="end-btn"><span className="material-symbols-outlined">call_end</span></button>
            </div>
        </div>
    )
}

export default Test;