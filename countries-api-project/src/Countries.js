import React, { useEffect, useState } from "react";
import "./Countries.css";

function Countries() {
    const [allCountries, setAllCountries] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                // Sort alphabetically
                const sorted = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setAllCountries(sorted);
                setLoading(false);
            });
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    return (
        <div className="container">
            <h1>🌐 Country List</h1>
            {loading ? (
                <p>Loading countries...</p>
            ) : (
                <>
                    <div className="country-list">
                        {allCountries.slice(0, visibleCount).map((country) => (
                            <div className="card" key={country.cca3}>
                                <img src={country.flags.svg} alt="flag" />
                                <h2>{country.name.common}</h2>
                                <p><strong>Capital:</strong> {country.capital?.[0] || "Unknown"}</p>
                                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>

                                {/* ✅ Ternary Operator to color region */}
                                <p>
                                    <strong>Region:</strong>{" "}
                                    <span
                                        style={{
                                            color:
                                                country.region === "Europe"
                                                    ? "blue"
                                                    : country.region === "Asia"
                                                        ? "red"
                                                        : country.region === "Africa"
                                                            ? "green"
                                                            : "gray",
                                        }}
                                    >
                                        {country.region}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ✅ "Load more" button */}
                    {visibleCount < allCountries.length && (
                        <button className="load-button" onClick={handleLoadMore}>
                            Load More
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default Countries;
