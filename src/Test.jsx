import React from 'react';

const Test = () => {
    return (
        <div className="test-container">
            <h2>Exam Conversation</h2>
            <div className="conversation">
                <div className="chat gpt">Say "I am ready to start" whenever you are ready to start the exam</div>
                <div className="chat user">User: I am ready to start the exam</div>
                <div className="chat gpt">Good, let's begin the exam on SQL databases. Question 1: Define SQL databases and explain their purpose in data management</div>
                <div className="chat user">
                    User: A SQL database, or Structured Query Language database, is a type of relational database management system (RDBMS) that stores and manages data in a structured format. SQL databases are based on the relational model, which organizes data into tables with rows and columns, and they use SQL for querying and manipulating the data.</div>
            </div>
        </div>
    )
}

export default Test;