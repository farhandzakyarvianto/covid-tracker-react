import React from "react";
import "./Table.css";

const Table = ({ countries }) => {
    let i = 0;
    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <tr>
                    <td>{++i}</td>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
};

export default Table;
