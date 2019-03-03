import React from "react";
import Book from "./Book";
import "./style.css";


export default (props)=>{
    return (
        <div className="container savedBooks">
            {props.saved != [] && props.saved.map((book)=>(
                <div className="container" key={book._id}>
                    <Book 
                        title={book.title} 
                        link={book.link} 
                        authors={book.authors}
                        image={book.image}
                        description={book.description}
                        buttonClass="btn btn-outline-danger"
                        buttonVal="Delete"
                        btnOnClick={props.deleteBook}
                        fnParam={book._id}
                    />
                </div>
            ))}
        </div> 
    );
}