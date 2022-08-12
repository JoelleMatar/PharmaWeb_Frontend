import React from "react";
import "./QuestionOptions.css";

const QuestionOptions = (props) => {
    const options = [
        { text: "Search for Products", handler: props.actionProvider.handleJavascriptList, id: 1 },
        { text: "Find Pharmacies", handler: () => { }, id: 2 },
        { text: "Donating Drugs", handler: () => { }, id: 3 },
        { text: "Requesting Drugs", handler: () => { }, id: 4 },
        { text: "Become a Member", handler: () => { }, id: 5 },
    ];

    const optionsMarkup = options.map((option) => (
        <button
          className="learning-option-button"
          key={option.id}
          onClick={option.handler}
        >
          {option.text}
        </button>
      ));

    return <div className="question-options-container">{optionsMarkup}</div>;
};

export default QuestionOptions;