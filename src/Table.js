import React from "react";
import numeral from "numeral";
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
                        <strong>{numeral(cases).format(0, 0)}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
};

export default Table;
