import React, { Component } from "react"
import ReactDOM from "react-dom"
import {Store, BookReducer} from "../../reducers/book"

export default class BookIndex extends Component {

  constructor(){
    super()

    this.state = {
      books: new Array(),
      favorites: new Array()
    }
  }

  componentWillMount(){
    Store.subscribe(() => {
      let storeState = Store.getState()
      this.setState({
        books: storeState.books,
        favorites: storeState.favorites
      })
    })
  }

  like(book){
    Store.dispatch({
      type: "LIKE",
      favorite: book
    })
  }

  render(){
    const {books} = this.state

    return (
      <div className="index ui grid">
        {(books).map((book, i) => (
          <div key={i} className="six wide column">
            <div className="ui card">
              <div className="image">
                <img src={"http://covers.openlibrary.org/b/id/"+book.cover_i+"-M.jpg"} alt={book.name} />
              </div>
              <div className="content">
                <a href={"https://openlibrary.org"+"/people/george08/lists/OL2643L/I've_Read_This"}
                  className="header"
                  target="_blank">{book.title_suggest} {i}</a>
                <div className="meta">
                  <span className="date">{book.first_publish_year}</span>
                </div>
                <div className="description">
                  {book.first_sentence}
                </div>
              </div>
              <div className="extra content">
                <span className="left floated star">
                  <button onClick={this.like.bind(this, book)}>
                    <i className="star icon"></i>
                    Favorite
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
