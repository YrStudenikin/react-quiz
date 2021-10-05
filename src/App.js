import React, {useState} from "react";
import questions from "./q.json";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerClick = isCorrect => {
        isCorrect && setScore(score + 1);

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleRefresh = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <div className="app">
            <div className="quiz">
                {
                    !showScore
                        ?
                        <div className="quiz_questions">
                            <div className="question_box">
                                <div className="question_count">
                                    <span>Вопрос {currentQuestion + 1}</span> / {questions.length}
                                </div>
                                <div className="question_text">
                                    {questions[currentQuestion].question}
                                </div>
                            </div>
                            <div className="answer_box">
                                {
                                    questions[currentQuestion].answers.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                handleAnswerClick(item.correct)
                                            }}
                                        >
                                            {item.answer}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <div className="quiz_show_score">
                            <span>Правильных ответов: {score} из {questions.length}</span>
                            <button onClick={handleRefresh} className="refresh_btn">Начать заново</button>
                        </div>
                }
            </div>
        </div>
    );
}

export default App;
