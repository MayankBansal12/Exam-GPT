import axios from 'axios';
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Test = () => {
    const [chats, setChats] = useState([{
        "role": "gpt",
        "message": "Say 'I am ready to start' whenever you are ready to start the exam"
    }]);

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const generateResponse = async (input) => {
        console.log("Input Received:", input);
        const req = {
            input: input
        }
        if (input) {
            const userMessage = {
                "role": "user",
                "message": "You: " + input
            };
            setChats((prevChats) => [...prevChats, userMessage]);

            try {
                const res = await axios.post('http://localhost:8000/response', req);
                const gptMessage = {
                    "role": "gpt",
                    "message": res.data.response
                };
                setChats((prevChats) => [...prevChats, gptMessage]);
            } catch (error) {
                // Handle any errors from the API request
                console.error("API request error:", error);
            }
        }
    }

    const handleStartListening = () => SpeechRecognition.startListening({ continuous: true, interimResults: true });

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        generateResponse(transcript);
    };

    return (
        <div className="test-container">
            <h2>Exam Conversation</h2>
            <div className="conversation">
                {chats.map((chat, i) => (
                    <div key={i} className={"chat " + chat.role}>{chat.message}</div>
                ))}
                {!browserSupportsSpeechRecognition ? <span>Browser doesn't support speech recognition.</span> : (<div className="chat user" style={{ "textAlign": "center", "backgroundColor": "#252424" }}>
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