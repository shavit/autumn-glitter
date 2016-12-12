import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Store, BookReducer} from "../reducers/book"
import {router} from "../Router"


export default class Sidebar extends Component {

  constructor(){
    super()

    this.state = {
      books: new Array(),
      favorites: new Array()
    }
  }

  componentWillMount(){

    this.setState({
      books: this.props.books,
      favorites: this.props.favorites
    })
  }

  reloadBooks(){
    try {
      const currentBooks = localStorage.getItem("bookState")
      const books = JSON.parse(currentBooks)

      Store.dispatch({
        type: "CREATE",
        books: books,
        favorites: this.props.favorites
      })

    } catch(err){
      console.log(err)
      console.error("Error parsing JSON from local storage")
    }
  }

  findBooks(event){
    event.preventDefault()

    let termDOM = ReactDOM.findDOMNode(this.refs.searchTerm)
    let term = termDOM.value.trim()

    // If there are no results in the grid, reload from the store
    if (this.props.books.length == 0){
      this.reloadBooks()
    }

    // publish change
    // Store.dispatch({
    //   type: "UPDATE",
    //   books: this.state.books.concat(term)
    // })

    // reset
    termDOM.value = ""
  }

  filterBooks(event){
    let term = event.target.value
    let re = new RegExp(term, "gi")

    if (term.length == 0){
      this.reloadBooks()
      return
    }


    let books = this.props.books.filter((book) => (
      book.title_suggest.match(re)
    ))

    // publish change
    Store.dispatch({
      type: "UPDATE",
      books: books
    })
  }


  render(){
    const {books} = this.state
    const favorites = (this.props.favorites || new Array())

    return (
      <div className="sidebar">
        <form className="ui form search" onSubmit={this.findBooks.bind(this)}>
          <fieldset className="field">
            <label>
              <input
                onClick={router.url.bind(router, "index")}
                placeholder="Search" type="text"
                ref="searchTerm" onChange={this.filterBooks.bind(this)} />
            </label>
          </fieldset>
        </form>

        <hr className="ui divider" />

        <div className="ui relaxed divided list">
          <a onClick={router.url.bind(router, "index")}
            className="item">
            <i className="book icon">&nbsp;</i>
            <strong className="content">
              <span className="header">Browse</span>
              <span className="description">Find books to read.</span>
            </strong>
          </a>
          <a onClick={router.url.bind(router, "favorites")}
            className="item">
            <i className="bookmark icon">&nbsp;</i>
            <strong className="content">
              <span className="header">My bookmarks</span>
              <span className="description">Browse your favorite books.</span>
            </strong>
          </a>
          <a onClick={router.url.bind(router, "report")}
            className="item">
            <i className="calendar icon">&nbsp;</i>
            <strong className="content">
              <span className="header">My history</span>
              <span className="description">Your reading history.
                <span className="favorites count">{favorites.length}</span> books that you liked so far.</span>
            </strong>
          </a>

        </div>

      </div>
    )
  }
}

const appDOM = document.getElementById("sidebar")
if (appDOM != undefined){
  ReactDOM.render(<Sidebar />,
    appDOM)
}
