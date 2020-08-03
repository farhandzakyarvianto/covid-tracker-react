import React from "react";
import "./infoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, ...props }) {
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/* Number */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
