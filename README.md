<h1 align="center"> ExamGPT - Conduct Oral Exam using ChatGPT </h1>
<br />
ExamGPT is a powerful tool that simplifies the process of conducting oral exams. It leverages the GPT-3.5 model from OpenAI to act as an interviewer, asking questions based on a provided topic. This project combines speech recognition, text-to-speech, and PDF handling to create a seamless oral exam experience.

## Features

- **Topic-Based Questions**: Input a PDF document on the desired topic, and ExamGPT will generate relevant questions for the oral exam.

- **Transcription**: As the AI interviewer asks questions, the transcription of the speech will be displayed on the screen.

- **Recording Responses**: Easily record your responses by clicking the microphone icon. When you're done, stop recording.

- **Text-to-Speech**: ExamGPT uses the `speechSynthesis` library to convert text into speech for a natural conversational experience.

- **Speech-to-Text**: The project includes `react-speech-recognition` library to transcribe spoken responses.

## Getting Started

1. Set up the client and server as described in the Installation section.
2. Provide a PDF document on the desired topic to the client.
3. Make sure the document is not too long and contains text. Must have a .pdf extension.
4. Start the oral exam, and ExamGPT will generate questions and provide transcriptions.
5. Response can be recorded using the mic button provided. Speak loudly and clearly and don't take pauses.
6. End the test by clicking the end button provided in the centre of the screen.

## Installation

These are the steps to set up the project locally:

### Client (Frontend)

1. Clone the repository: `git clone [repository URL]`
2. Navigate to the client directory: `cd client`
3. Install dependencies: `npm i`
4. Start the client: `npm start` (port 3000)

Example `.env` file:
REACT_APP_SERVER_URL=Server_URL

### Server (Backend)

1. Navigate to the server directory: `cd server`.
2. Install dependencies: `npm install`
3. Start the server: `npm start` (port 8000)

Example `.env` file:
API_KEY=Your_OpenAI_API_Key

## Tech Stack

- **Frontend**: React.js
- **Backend**: Using Express.js and Node.js
- **PDF Handling**: pdfjs-dist library to extract the text from pdf
- **Speech-to-Text**: React Speech Recognition Library
- **Text-to-Speech**: Using speechSynthesis
- **AI Response**: Generated using OpenAI GPT-3.5 model
- **State Management**: useContext Api

## Demo
- You can check the project video [here](https://www.youtube.com/watch?v=bMulW8YcDTA)
- You can visit the site [here](https://examgpt.vercel.app/)
- Screenshots for the site are available below: 

![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1696229628/Website%20Demo/Home_bc0k8e.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1696229657/Website%20Demo/Not_Recorded_p5boka.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1696229650/Website%20Demo/Test_vgszre.png)


## Contributing

Contributions to ExamGPT are welcome! If you'd like to contribute, please follow the best open-source and contributing practices.
Start by raising an issue related to any bugs or changes you would like to see!

<!-- ## License
This project is licensed under the [MIT License](LICENSE). -->

## Contact

If you have any questions or need support, feel free to contact at mayankbansal125@gmail.com

---

<!--[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)-->
