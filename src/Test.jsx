import axios from 'axios';
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Test = () => {
    const [text, setText] = useState("");

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const handleStartListening = () => SpeechRecognition.startListening({ continuous: true, interimResults: true });

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setText(transcript);
        console.log(transcript);
    };
    return (
        <div className="test-container">
            <h2>Exam Conversation</h2>
            <div className="conversation">
                <div className="chats">
                    <div className="chat gpt">Say "I am ready to start" whenever you are ready to start the exam</div>
                    <div className="chat user">You: I am ready to start the exam</div>
                    <div className="chat gpt">Good, let's begin the exam on SQL databases. Question 1: Define SQL databases and explain their purpose in data management</div>
                </div>
                {!browserSupportsSpeechRecognition ? <span>Browser doesn't support speech recognition.</span> : (<div className="chat user" style={{ "textAlign": "center" }}>
                    {!listening ? <span>Click on  <button className="material-symbols-outlined mic-btn" onClick={handleStartListening} disabled={listening}>mic</button>  to start recording your answer</span> : <span>Recording...  Click <button className="material-symbols-outlined mic-btn" onClick={handleStopListening} disabled={!listening}>
                        stop_circle
                    </button> when you are done</span>}
                </div>)}
            </div>
            <div style={{ "width": "100%", "textAlign": "center" }}>
                <button className="end-btn"><span className="material-symbols-outlined">call_end</span></button>
            </div>
        </div>
    )
}

export default Test;