import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import QuestionOptions from "./QuestionOptions";
import LinkList from "./LinkList";

const config = {
    initialMessages: [
        createChatBotMessage("Hi, how can I help you?", {
            widget: "questionOptions",
        }),
    ],
    widgets: [
        {
            widgetName: "questionOptions",
            widgetFunc: (props) => <QuestionOptions {...props} />,
        },
        {
            widgetName: "productsLink",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                    {
                        text: "Introduction to JS",
                        url:
                            "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
                        id: 1,
                    },
                    {
                        text: "Mozilla JS Guide",
                        url:
                            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                        id: 2,
                    },
                    {
                        text: "Frontend Masters",
                        url: "https://frontendmasters.com",
                        id: 3,
                    },
                ],
            },
        },
    ],
};

export default config;