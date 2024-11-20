// src/components/EducationContent.js
import React, { useState, useEffect } from "react";
import "./styles/EducationContent.css";

const EducationContent = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = [
                {
                    id: 1,
                    title: "Understanding Healthcare Protocols",
                    description:
                        "Carbs or fats for breakfast? Which is best for healthy weight in men vs women?",
                    link: "https://www.medicalnewstoday.com/articles/carbs-or-fats-for-breakfast-which-is-best-for-healthy-weight-in-men-vs-women",
                },
                {
                    id: 2,
                    title: "Advancements in Medical Technology",
                    description: "How technology is reshaping healthcare.",
                    link: "https://www.healthcaretech.com/advancements",
                },
                {
                    id: 3,
                    title: "Best Practices for Patient Interaction",
                    description: "Guidelines for better communication with patients.",
                    link: "https://www.patientcare.com/interaction",
                },
                {
                    id: 4,
                    title: "The Future of AI in Healthcare",
                    description: "Exploring the role of artificial intelligence in patient care.",
                    link: "https://www.healthcareai.com/future-of-ai-in-healthcare",
                },
                {
                    id: 5,
                    title: "Telemedicine: The Next Big Thing",
                    description: "How telemedicine is improving accessibility to care.",
                    link: "https://www.telemed.com/next-big-thing",
                },
                {
                    id: 6,
                    title: "How to Build a Healthy Lifestyle",
                    description: "Tips for maintaining a balanced diet and regular exercise.",
                    link: "https://www.healthylifestyle.com/build-a-healthy-lifestyle",
                },
                {
                    id: 7,
                    title: "Mental Health Awareness",
                    description: "Understanding the importance of mental health in overall well-being.",
                    link: "https://www.mentalhealth.org/awareness",
                },
                {
                    id: 8,
                    title: "Nutrition for Optimal Health",
                    description: "The role of proper nutrition in disease prevention.",
                    link: "https://www.nutrition.com/optimal-health",
                },
                {
                    id: 9,
                    title: "Physical Therapy for Injury Recovery",
                    description: "How physical therapy helps with injury rehabilitation.",
                    link: "https://www.physicaltherapy.com/injury-recovery",
                },
                {
                    id: 10,
                    title: "Emergency Care in Rural Areas",
                    description: "Addressing healthcare challenges in rural communities.",
                    link: "https://www.ruralhealthcare.com/emergency-care",
                },
                {
                    id: 11,
                    title: "Advances in Cancer Research",
                    description: "Latest breakthroughs in cancer treatments and therapies.",
                    link: "https://www.cancerresearch.com/advances",
                },
                {
                    id: 12,
                    title: "Healthcare Policies for the Future",
                    description: "How healthcare policies are evolving to meet new needs.",
                    link: "https://www.healthpolicy.com/future",
                },
                {
                    id: 13,
                    title: "Patient-Centered Care",
                    description: "Why patient-centered care is crucial for better outcomes.",
                    link: "https://www.patientcare.com/centered-care",
                },
                {
                    id: 14,
                    title: "Preventive Medicine",
                    description: "The importance of preventive measures to avoid chronic diseases.",
                    link: "https://www.preventivemedicine.com",
                },
                {
                    id: 15,
                    title: "Chronic Disease Management",
                    description: "How to manage chronic conditions for better quality of life.",
                    link: "https://www.chronicdisease.com/management",
                },
                {
                    id: 16,
                    title: "Health Insurance: What You Need to Know",
                    description: "Understanding health insurance plans and benefits.",
                    link: "https://www.healthinsurance.com/understanding-plans",
                },
                {
                    id: 17,
                    title: "The Importance of Regular Check-ups",
                    description: "Why regular medical check-ups are vital for long-term health.",
                    link: "https://www.regularcheckups.com",
                },
                {
                    id: 18,
                    title: "The Role of Technology in Healthcare Data",
                    description: "How digital health records and tech are transforming healthcare.",
                    link: "https://www.healthtech.com/data",
                },
                {
                    id: 19,
                    title: "Vaccination Strategies for Global Health",
                    description: "The importance of vaccination in preventing disease outbreaks.",
                    link: "https://www.globalhealth.com/vaccination-strategies",
                },
                {
                    id: 20,
                    title: "Healthy Aging Tips",
                    description: "How to maintain health and vitality as you age.",
                    link: "https://www.healthyaging.com/tips",
                },
            ];
            setArticles(data);
        };
        fetchArticles();
    }, []);

    return (
        <div className="education-content__container">
            <h2 className="education-content__title">Education Content</h2>
            {articles.length > 0 ? (
                articles.map((article) => (
                    <div key={article.id} className="education-content__item">
                        <h3 className="education-content__item-title">
                            {article.title}
                        </h3>
                        <p className="education-content__item-description">
                            {article.description}
                        </p>
                        <a
                            href={article.link}
                            className="education-content__item-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read More
                        </a>
                    </div>
                ))
            ) : (
                <p className="education-content__empty">No educational content available.</p>
            )}
        </div>
    );
};

export default EducationContent;
