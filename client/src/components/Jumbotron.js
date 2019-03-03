import React from "react";
import "./style.css";

export default (prop) => {
    return (
        <div className="jumbotron container">
            <h1 className="display-4 gameName">React Google Books</h1>
            <hr className="my-4"></hr>
            <p className="lead">Search for and Save Books of Interest</p>
        </div>
    );
}