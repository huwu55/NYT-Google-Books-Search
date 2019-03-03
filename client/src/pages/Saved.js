import React from "react";
import SavedBooks from "../components/SavedBooks";
import API from "../utils/API";
import "../components/style.css";

class Saved extends React.Component {
    constructor(){
        super();

        this.state = {
            saved : []
        };
    }

    componentDidMount(){
        API.getBooks()
            .then(res => {
                this.setState({saved : res.data});
            })
            .catch(err => console.log(err));
    }

    deleteBook = (bookID)=>{
        API.deleteBook(bookID)
            .then(res => {
                console.log(res.data);
                this.setState({saved: res.data});
            
            })
            .catch(err => console.log(err));
    }

    render(){
        return (
            <div className="container">
                <h2>Saved Books</h2>
                <SavedBooks saved={this.state.saved} deleteBook={this.deleteBook}/>
            </div>
        );
    }
}

export default Saved;