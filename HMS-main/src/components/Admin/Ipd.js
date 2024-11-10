import React, { useState } from 'react';
import './Styles/Ipd.css';

const opdStaff = {
    doctors: [
        { name: 'Dr. Smith', role: 'Emergency Doctor', shift: 'Shift 1', date: '2024-11-10' },
        { name: 'Dr. Johnson', role: 'General Doctor', shift: 'Shift 1', date: '2024-11-10' },
        { name: 'Dr. Brown', role: 'General Doctor', shift: 'Shift 2', date: '2024-11-11' },
        { name: 'Dr. Lee', role: 'General Doctor', shift: 'Shift 3', date: '2024-11-12' },
    ],
    nurses: [
        { name: 'Nurse Adams', shift: 'Shift 1', date: '2024-11-10' },
        { name: 'Nurse Baker', shift: 'Shift 2', date: '2024-11-11' },
        { name: 'Nurse Clark', shift: 'Shift 3', date: '2024-11-12' },
    ],
    cleaningStaff: [
        { name: 'John Doe', shift: 'Shift 1', date: '2024-11-10' },
        { name: 'Jane Smith', shift: 'Shift 2', date: '2024-11-11' },
        { name: 'Mark Jones', shift: 'Shift 3', date: '2024-11-12' },
    ]
};

const Ipd = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(opdStaff.doctors);
    const [filteredNurses, setFilteredNurses] = useState(opdStaff.nurses);
    const [filteredCleaningStaff, setFilteredCleaningStaff] = useState(opdStaff.cleaningStaff);

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);

        if (date) {
            const filteredDocs = opdStaff.doctors.filter((doctor) => doctor.date === date);
            const filteredNurs = opdStaff.nurses.filter((nurse) => nurse.date === date);
            const filteredClean = opdStaff.cleaningStaff.filter((cleaner) => cleaner.date === date);
            setFilteredDoctors(filteredDocs);
            setFilteredNurses(filteredNurs);
            setFilteredCleaningStaff(filteredClean);
        } else {
            setFilteredDoctors(opdStaff.doctors);
            setFilteredNurses(opdStaff.nurses);
            setFilteredCleaningStaff(opdStaff.cleaningStaff);
        }
    };

    const clearFilter = () => {
        setSelectedDate('');
        setFilteredDoctors(opdStaff.doctors);
        setFilteredNurses(opdStaff.nurses);
        setFilteredCleaningStaff(opdStaff.cleaningStaff);
    };

    return (
        <div className="opd-container">
            <h2>In-Patient Department (IPD)- Doctors on Duty Today</h2>
            <div className="filter-container">
                <div className="filter-controls">
                    <label htmlFor="date">Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="date-input"
                    />
                    <button onClick={clearFilter} className="clear-btn">Clear Filter</button>
                </div>
            </div>

            <h3>Doctors on Duty</h3>
            <ul>
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor, index) => (
                        <li key={index} className={doctor.role === 'Emergency Doctor' ? 'emergency-doctor' : 'general-doctor'}>
                            {doctor.name} - {doctor.role} - {doctor.shift} - {doctor.date}
                        </li>
                    ))
                ) : (
                    <p>No doctors scheduled for this date.</p>
                )}
            </ul>

            <h3>Nurses on Duty</h3>
            <ul>
                {filteredNurses.length > 0 ? (
                    filteredNurses.map((nurse, index) => (
                        <li key={index} className="nurse">
                            {nurse.name} - {nurse.shift} - {nurse.date}
                        </li>
                    ))
                ) : (
                    <p>No nurses scheduled for this date.</p>
                )}
            </ul>

            <h3>Cleaning Staff on Duty</h3>
            <ul>
                {filteredCleaningStaff.length > 0 ? (
                    filteredCleaningStaff.map((cleaner, index) => (
                        <li key={index} className="cleaning-staff">
                            {cleaner.name} - {cleaner.shift} - {cleaner.date}
                        </li>
                    ))
                ) : (
                    <p>No cleaning staff scheduled for this date.</p>
                )}
            </ul>
        </div>
    );
};

export default Ipd;
