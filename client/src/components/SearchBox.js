import React from "react";
import "./style.css";

export default (props) => {
    return (
        <div className="container search">
            <form onSubmit={props.submitSearch}>
                <div id="searchBox" className="col-6">
                    <input type="text" className="form-control" placeholder="Fantastic Beasts and Where to Find Them" />
                </div>
                <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </div>
    );
}