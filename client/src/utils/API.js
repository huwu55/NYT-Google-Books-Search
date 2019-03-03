import axios from "axios";

export default {
  searchBook: function(searchTerm) {
    console.log(searchTerm);
    return axios.get("/search/" + searchTerm);
  },

  getBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
