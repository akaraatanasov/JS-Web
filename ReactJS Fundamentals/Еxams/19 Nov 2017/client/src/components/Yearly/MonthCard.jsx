import React from 'react';
import { Link } from 'react-router-dom';

export default function MonthCard({ noOfMonth, year, budget, balance }) {
    let monthMap = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }

    return (
        <div className="col-md-3">
            <div className="card text-white bg-secondary">
                <div className="card-body">
                    <blockquote className="card-blockquote">
                        <h2>{monthMap[noOfMonth]}</h2>
                        <h4>Year {year}</h4>
                        <label htmlFor="budget">Budget:</label>
                        <input className="col-md-9" name="budget" disabled="" defaultValue={budget} />
                        <label htmlFor="balance">Balance:</label>
                        <input className="col-md-9" name="balance" disabled="" defaultValue={balance} />
                        <div className="space-top">
                            <Link to={`/plan/${year}/${noOfMonth}`}>View Details</Link>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}