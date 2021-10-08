import React, {useState} from "react";
import questions from "./q.json";
import AnswerBox from "./AnswerBox";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerClick = answers => {
        let isCorrect = !answers.some(item => !item.correct);
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

    const isMultiple = questions[currentQuestion].answers.filter(item => item.correct).length > 1;

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
                                {
                                    isMultiple &&
                                    <div className="multiple_hint">
                                        Выберите несколько вариантов ответа
                                    </div>
                                }
                            </div>
                            <AnswerBox
                                key={questions[currentQuestion].question}
                                questions={questions[currentQuestion].answers}
                                handleSubmit={handleAnswerClick}
                                isMultiple={isMultiple}
                            />
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
