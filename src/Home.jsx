import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const uploadFile = (e) => {
        let file = e.target.files[0];
        setFile(file);
    }
    const removeFile = () => {
        setFile(null);
    }
    const startTest = () => {
        if (file) {
            const req = {
                "file": file
            }
            console.log(req.file);
            axios.post("http://localhost:8000/upload", req).then(() => navigate("/test")).catch(err => console.log("Error: ", err));
        } else {
            window.alert("Upload file First!");
        }
    }

    return (
        <div className="home">
            <h1 className="heading">Oral Exam</h1>
            <ul>
                <li>To start the oral exam you will have to upload a pdf containing example questions</li>
                <li>After pdf is uploaded, click on Start Test to start</li>
                <li>Questions will be asked by AI bot and transcription will be available on screen</li>
                <li>Answer the questions clearly so that speech can be recognized.</li>
                <li>Conversation will be transcripted which will be visible on the screen</li>
            </ul>
            <div className="upload">
                {(!file && <label className="file-upload-container">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={uploadFile}
                        className="file-upload-input"
                    />
                    <span>Click to upload the PDF</span>
                </label>)}
                {(file && <div className="file-container">
                    <span className="file-box">{file.name}</span>
                    <button className="close-btn" onClick={removeFile}>x</button>
                </div>)}
            </div>
            <div>
                <button className="start-btn" style={{ backgroundColor: file ? "green" : "grey" }} onClick={startTest}>Start Test</button>
            </div>
        </div>
    )
}

export default Home;