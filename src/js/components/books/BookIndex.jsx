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
    const action = (book.liked == true)?"UNLIKE":"LIKE"

    Store.dispatch({
      type: action,
      favorite: book
    })
  }

  render(){
    const {pageName, books} = this.props

    return (
      <div className={((pageName=="index")?"index ui":"hidden")}>

        <h1 className="ui header">Browse</h1>
        <hr className="ui divider" />

        <div className="ui grid">
          {(books).map((book, i) => (
            <div key={i} className="eight wide column">
              <div className="ui card">
                <div className="image">
                  <img src={"http://covers.openlibrary.org/b/id/"+book.cover_i+"-M.jpg"} alt={book.name} />
                </div>
                <div className="content">
                  <a href={"https://openlibrary.org"+"/people/george08/lists/OL2643L/I've_Read_This"}
                    className="header"
                    target="_blank">{book.title_suggest}</a>
                  <div className="meta">
                    <span className="date">{book.first_publish_year}</span>
                  </div>
                  <div className="description">
                    {book.first_sentence}
                  </div>
                </div>
                <div className="extra content">
                <div className="ui heart rating"
                  data-rating="1"
                  data-max-rating="3">&nbsp;</div>
                  <span className="left floated star">
                    <button onClick={this.like.bind(this, book)}>
                      <i className={(book.liked)?"ui heart rating icon active":"ui heart rating icon"}>&nbsp;</i>
                      <span>{(book.liked)?"Liked":"Like"}</span>
                    </button>

                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
