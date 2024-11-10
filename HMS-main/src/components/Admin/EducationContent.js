import React, { useState, useEffect } from "react";
import "./Styles/EducationContent.css";

const EducationContent = () => {
    const [articles, setArticles] = useState([]); // Default value as an empty array

    useEffect(() => {
        // Simulating a data fetch with example data
        const fetchArticles = async () => {
            try {
                // Replace this with an actual API call if needed
                const data = [
                    {
                        id: 1,
                        title: "Understanding Healthcare Protocols",
                        description:
                            "An overview of essential healthcare protocols for doctors.",
                        link: "#",
                    },
                    {
                        id: 2,
                        title: "Advancements in Medical Technology",
                        description: "How technology is reshaping healthcare.",
                        link: "#",
                    },
                    {
                        id: 3,
                        title: "Best Practices for Patient Interaction",
                        description:
                            "Guidelines for better communication with patients.",
                        link: "#",
                    },
                ];
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setArticles([]); // Ensure articles is an array if fetch fails
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="education-content__container">
            <h2 className="education-content__title">Education Content</h2>
            {articles && articles.length > 0 ? (
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
                        >
                            Read More
                        </a>
                    </div>
                ))
            ) : (
                <p className="education-content__empty">
                    No educational content available.
                </p>
            )}
        </div>
    );
};

export default EducationContent;
