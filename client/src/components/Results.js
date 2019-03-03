import React from "react";
import Book from "./Book";
import "./style.css";


export default (props)=>{
    return (
        <div className="container result">
            {props.results.map((book, i)=>(
                <div className="container" key={i}>
                    <Book 
                        title={book.title} 
                        link={book.link} 
                        authors={book.authors}
                        image={book.image}
                        description={book.description}
                        buttonClass="btn btn-outline-success"
                        buttonVal="Save"
                        btnOnClick={props.saveBook}
                        fnParam={book}
                    />
                </div>
            ))}
        </div> 
    );
}