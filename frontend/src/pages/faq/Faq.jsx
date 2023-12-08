import React, { useState } from 'react';
import './Faq.css'

const Faq = () => {
  // Sample FAQ data
  const faqData = [
    {
      question: "How do I search for hostels on HostelFinder?",
      answer: "You can search for hostels by entering your desired location, price range, and other preferences in the search bar on the homepage. Click the 'Search' button to view the results."
    },
    {
      question: "Can I list my hostel on HostelFinder?",
      answer: "Yes, hostel owners can list their hostels on HostelFinder. Click the 'List Your Hostel' button on the website, fill out the necessary information, and submit your listing for review."
    },
    {
      question: "How can I contact the hostel owner?",
      answer: "You can usually find the contact information for the hostel owner on the hostel's listing page. This typically includes an email address or phone number that you can use to reach out for inquiries."
    },
    {
      question: "Is my personal information safe on HostelFinder?",
      answer: "We take the security of your personal information seriously. Your data is encrypted and stored securely. We do not share your information with third parties without your consent."
    },
    {
      question: "How can I reset my password if I forget it?",
      answer: "If you forget your password, you can click the 'Forgot Password' link on the login page. Follow the instructions to reset your password. You will receive an email with further instructions on how to set a new password."
    },
  ];

  // State to track which questions are open
  const [openQuestions, setOpenQuestions] = useState([]);

  // Function to toggle the open/close state of a question
  const toggleQuestion = (index) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter(item => item !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <ul className="faq-list">
        {faqData.map((faq, index) => (
          <li key={index} className="faq-item">
            <div className="question" onClick={() => toggleQuestion(index)}>
              <h3>{faq.question}</h3>
              <span className={`arrow ${openQuestions.includes(index) ? 'open' : ''}`}>▼</span>
            </div>
            {openQuestions.includes(index) && (
              <p className='ans'>{faq.answer}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
