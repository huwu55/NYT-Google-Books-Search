import React from "react";
import SearchBox from "../components/SearchBox";
import Results from "../components/Results";
import API from "../utils/API";
import "../components/style.css";

class Search extends React.Component {
    constructor(){
        super();

        this.state = {
            results : []
        };
    }

    submitSearch = event => {
        event.preventDefault();

        let searchTerm = event.target.children[0].children[0].value;
        //alert(searchTerm);
        API.searchBook(searchTerm)
            .then(res => {
                // console.log(res.data);
                this.setState({results : res.data});
            })
            .catch(err => console.log(err));
    }

    saveBook = (bookInfo)=>{
        //console.log(bookInfo);
        API.saveBook(bookInfo);
    }

    render(){
        return (
            <div className="container">
                <SearchBox submitSearch={this.submitSearch}/>
                <Results results={this.state.results} saveBook={this.saveBook}/>
            </div>
        );
    }
}

export default Search;