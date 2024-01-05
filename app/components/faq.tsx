import React, { useState } from 'react';

interface FAQProps {
    // Define your component's props here
    question: string;
    answer: string;
}

const FAQ: React.FC<FAQProps> = ({  question, answer }) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>
            <button className="flex items-center focus:outline-none" onClick={handleToggle}>
                {collapsed ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    :
                    <svg className="flex-shrink-0 w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                }

                <h1 className="mx-4 text-xl text-gray-700 dark:text-white">{question?.toString()}</h1>
            </button>

            {collapsed ?
                null
                :
                <div className="flex mt-8 md:mx-10">
                    <span className="border border-sky-600"></span>

                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                        {answer}
                    </p>
                </div>
            }
        </div>
    );
};

export default FAQ;