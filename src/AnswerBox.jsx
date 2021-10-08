import React, {useEffect, useState} from 'react';

const AnswerBox = ({questions, handleSubmit, isMultiple}) => {

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (!isMultiple && selected.length) {
            handleSubmit(selected)
        }
    }, [selected]);

    const handleSelect = (questionData) => {
        if (selected.find(item => questionData.answer === item.answer)) {
            setSelected(selected.filter(item => questionData.answer !== item.answer))
        } else {
            setSelected([...selected, questionData]);
        }
    };

    return (
        <div className="answer_box">
            {
                questions.map((item, index) => (
                    <button
                        className={
                            selected.some(el => el.answer === item.answer)
                            ? "selected" : ""
                        }
                        key={index}
                        onClick={() => {
                            handleSelect(item)
                        }}
                    >
                        {item.answer}
                    </button>
                ))


            }

            {
                isMultiple &&
                <button className="btn_confirm" onClick={() => handleSubmit(selected)}>Подтвердить</button>
            }
        </div>
    );
};

export default AnswerBox;