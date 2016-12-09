import React, { Component } from "react"
import ReactDOM from "react-dom"
import {Store, BookReducer} from "../reducers/book"

import jQuery from "jquery"

import Sidebar from "./Sidebar"
import BookIndex from "./books/BookIndex"


export default class BooksGrid extends Component {

  constructor(){
    super()

    try {
      var favorites = JSON.parse(localStorage.getItem("favoritesState"))
    } catch(err){
      console.log("Error loading favorites from local storage")
    }

    this.state = {
      books: new Array(),
      favorites: (favorites || new Array())
    }

  }

  componentWillMount(){
    // Subscribe to the store
    Store.subscribe(() => {
      let storeState = Store.getState()

      this.setState({
        books: storeState.books,
        favorites: storeState.favorites
      })
    })

    this.fetchBooks()
  }

  fetchBooks(){
    const currentBooks = localStorage.getItem("bookState")

    // check if local storage is available
    if (this.canSaveToLocalStorage() && currentBooks){
      jQuery.get("http://openlibrary.org/search.json?author=tolkien", (data) => {

        try {
          let entries = JSON.parse(data).docs
          // limit the number of results
          let newBooks = entries.slice(0,120).filter((book) => (
            !!book.cover_i && !!book.cover_edition_key
          ))

          // store the data
          localStorage.setItem("bookState", JSON.stringify(newBooks))
          Store.dispatch({
            type: "CREATE",
            books: newBooks,
            favorites: this.state.favorites
          })
        } catch (err){
            console.log(err)
            console.error("There is not enough space. Please try a different window not in private mode")
        }
      })
    } else {
      // load from local storage
      try {
        let books = JSON.parse(currentBooks)

        Store.dispatch({
          type: "CREATE",
          books: books,
          favorites: this.state.favorites
        })
        this.setState({
          books: books
        })
      } catch (err){
        console.log(err)
        console.error("Error parsing JSON from local storage")
      }
    }
  }

  canSaveToLocalStorage(){
    try{
      localStorage.setItem("test", 1)
    } catch(err){
      return false
    }

    return true
  }

  render(){
    const {books, favorites} = this.state

    return (
      <div className="preload ui four column doubling stackable grid container">
        <div className="four wide column">
          <Sidebar key="1" books={books} favorites={favorites} />
        </div>
        <div className="twelve wide column">
          <BookIndex key="2" books={books} favorites={favorites} />
        </div>
      </div>
    )
  }
}

const appDOM = document.getElementById("app")
if (appDOM != undefined){
  ReactDOM.render(<BooksGrid />,
    appDOM)
}
