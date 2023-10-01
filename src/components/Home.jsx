import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';
import { TextContext } from '../context/PdfTextContext';

const Home = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const { pdfText, setTextValue } = useContext(TextContext);

    const uploadFile = async (e) => {
        let uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const pdfData = new Uint8Array(event.target.result);
            try {
                const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
                let text = "";
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const pageText = await page.getTextContent();
                    text += pageText.items.map((item) => item.str).join(' ');
                }
                setTextValue(text.trim());
            } catch (error) {
                console.error("Error extracting text from PDF:", error);
            }
        };
        reader.readAsArrayBuffer(uploadedFile);
    };

    const removeFile = () => {
        setFile(null);
        setTextValue("");
    };

    const startTest = () => {
        if (file) {
            navigate("/test");
        } else {
            window.alert("Upload file First!");
        }
    };

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
                <button className="start-btn" style={{ backgroundColor: file ? "green" : "grey" }} onClick={startTest} disabled={!file}>Start Test</button>
            </div>
        </div>
    )
}

export default Home;