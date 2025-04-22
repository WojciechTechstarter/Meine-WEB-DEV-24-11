import React from "react";
import { Link } from "react-router-dom";
import "./Listing.css";

function Listing({ name, price, image }) {
    return (
        <div className="listing">
            <img src={image} alt={name} width="300" />
            <h2>{name}</h2>
            <p>Price: {price}</p>
            <Link to="/contact">Contact</Link>
        </div>
    );
}

export default Listing;
