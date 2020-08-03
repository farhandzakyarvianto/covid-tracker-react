import React, { useState, useEffect } from "react";
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "./App.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((res) => res.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        //async -> send a request , wait for it do something
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((res) => res.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));

                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        const url =
            countryCode === "Worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCountry(countryCode);
                setCountryInfo(data);
            });
    };
    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    {/* Header */}
                    {/* Title + Select input drop down field */}
                    <h1>Covid 19 Tracker</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            {/* loop through all the countries */}
                            <MenuItem value="Worldwide">Worldwide</MenuItem>
                            {countries.map((country) => (
                                <MenuItem value={country.value}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* InfoBoxs */}
                <div className="app__stats">
                    <InfoBox
                        title="Coronavirus cases"
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                    />

                    <InfoBox
                        title="Recovered"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />

                    <InfoBox
                        title="Deaths"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>

                {/* Map */}
                <Map />
            </div>
            <Card className="app_right">
                <CardContent>
                    {/* Table */}
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    {/* Graph */}
                    <h3>Worldwide new cases</h3>
                    <LineGraph />
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
