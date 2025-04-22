import React from "react";
import { NavLink } from "react-router-dom";
import Listing from "./components/Listing";
import "./App.css";

function App() {
  const houses = [
    { id: 1, name: "Beach House", price: "350€", image: "https://www.w3schools.com/w3images/house5.jpg" },
    { id: 2, name: "Mountain Cabin", price: "200€", image: "https://www.w3schools.com/w3images/house4.jpg" },
    { id: 3, name: "City Apartment", price: "500€", image: "https://www.w3schools.com/w3images/house1.jpg" },
  ];

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/contact">Contact</NavLink> |{" "}
        <NavLink to="/about">About</NavLink> |{" "}
        <NavLink to="/faq">FAQ</NavLink> |{" "}
        <NavLink to="/impressum">Impressum</NavLink>
      </nav>

      <div className="listing-container">
        {houses.map((house) => (
          <Listing key={house.id} name={house.name} price={house.price} image={house.image} />
        ))}
      </div>
    </>
  );
}

export default App;
