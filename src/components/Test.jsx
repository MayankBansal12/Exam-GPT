// Rendering the test component -> /test

import axios from "axios";
import React, { useContext, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { TextContext } from "../context/PdfTextContext";
import { useNavigate } from "react-router-dom";

const Test = () => {
    const navigate = useNavigate();
    const { pdfText, setTextValue } = useContext(TextContext);
    const [isgenerating, setIsGenerating] = useState(false);

    // Chat array saving the conversation
    const [chats, setChats] = useState([
        {
            role: "user",
            content:
                "I want you to act as an examiner. I will be the student and you will ask me the questions. I will provide you with details of a specific topic and you will have to conduct an exam where you will ask questions from student one by one. Based on the answer you can counter question or ask further questions. I want you to only reply as the examiner. Do not write all the conservation at once. I want you to only do the exam with me. Ask me the questions and wait for my answers. Do not write explanations, Ask me the questions one by one like an examiner does and wait for my answers. My first sentence will be 'I am ready to start' and then you can start the exam.",
        },
        {
            role: "user",
            content: `Here are the details about topic: ${pdfText}. Follow all guidelines, ask questions one by one like an examiner.`
        },
        {
            role: "assistant",
            content: "User has to say 'I am ready to start' whenever they want to start the exam."
        }
    ]);

    const [speaking, setSpeaking] = useState(false);

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        resetTranscript
    } = useSpeechRecognition();

    // Sending input to server and generating response
    const generateResponse = async (input) => {
        if (input) {
            const userMessage = {
                role: "user",
                content: input,
            };
            setChats((prevChats) => [...prevChats, userMessage]);

            const req = {
                chats: [...chats, userMessage],
            };
            setIsGenerating(true);

            try {
                const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/response", req);
                const response = res.data.response;

                gptSpeak(response);

                const gptMessage = {
                    role: "assistant",
                    content: response,
                };
                setChats((prevChats) => [...prevChats, gptMessage]);
                setIsGenerating(false);
            } catch (error) {
                console.error("API request error:", error);
            }
        } else {
            window.alert("Not recorded. Try again!");
        }
    };

    // Listening function related to speech to text
    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true, interimResults: true });
        resetTranscript();
    }

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        generateResponse(transcript);
    };

    // converting text response to speech
    const gptSpeak = (text) => {
        if (!speaking) {
            const utterance = new SpeechSynthesisUtterance(text);

            speechSynthesis.speak(utterance);
            setSpeaking(true);

            utterance.onend = () => {
                setSpeaking(false);
            };
        } else {
            speechSynthesis.cancel();
            setSpeaking(false);
        }
    };

    // Ending all running process to end the exam
    const endExam = () => {
        SpeechRecognition.stopListening();
        speechSynthesis.cancel();
        setSpeaking(false);
        setTextValue("");
        navigate("/");
    }

    return (
        <div className="test-container">
            <h2>Exam Conversation</h2>
            <div className="conversation">
                {chats.slice(2).map((chat, i) => (
                    <div key={i} className={"chat " + chat.role}>{chat.content}</div>
                ))}
                {isgenerating && <div className="chat user" style={{ "backgroundColor": "#0d0c0c" }}>Generating Response... Please hold on</div>}

                {!browserSupportsSpeechRecognition ? <span>Browser doesn't support speech recognition.</span> : (<div className="chat user" style={{ "textAlign": "center", "backgroundColor": "#252424" }}>
                    {!listening ? <span>Click on  <button className="material-symbols-outlined mic-btn" onClick={handleStartListening} disabled={listening || speaking}>mic</button>  to start recording your answer</span> : <span>Recording...  Click <button className="material-symbols-outlined mic-btn" onClick={handleStopListening} disabled={!listening}>
                        stop_circle
                    </button> when you are done</span>}
                </div>)}
            </div>
            <div style={{ "width": "100%", "textAlign": "center" }}>
                <button className="end-btn" onClick={endExam}><span className="material-symbols-outlined">call_end</span></button>
            </div>
        </div>
    )
}

export default Test;