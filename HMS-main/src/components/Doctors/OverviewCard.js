// src/Doctor/OverviewCard.js
import React from "react";
import "./styles/OverviewCard.css";

const OverviewCard = ({ title, value, icon }) => {
    return (
        <div className="overview-card-container">
            <div className="icon-container">{icon}</div>
            <div className="info-container">
                <h4>{title}</h4>
                <p>{value}</p>
            </div>
        </div>
    );
};

export default OverviewCard;
