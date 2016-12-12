import React, { Component } from "react"
import ReactDOM from "react-dom"
import {Store, BookReducer} from "../../reducers/book"

export default class BookFavorites extends Component {
  constructor(){
    super()

    this.state = {
      checkboxesToRemove: new Array()
    }
  }

  handleCheckboxChange(event){
    let checkboxes = (event.target.checked == true)
      ?(this.state.checkboxesToRemove.concat(event.target.value))
      :(this.state.checkboxesToRemove.filter((checkbox) => (
          (checkbox != event.target.value)
        )))

    this.setState({
      checkboxesToRemove: checkboxes
    })
  }

  handleSubmit(event){
    event.preventDefault()
    // Get the books
    let books = this.props.favorites.filter((favorite) => (
        (this.state.checkboxesToRemove.filter((checkbox) => (
          (favorite.cover_edition_key == checkbox)
        )).length > 0)
      ))

    books.map((book) => {
      Store.dispatch({
        type: "UNLIKE",
        favorite: book
      })
    })

  }

  removeBook(book, event){
    event.preventDefault()

    let checkboxes = (this.state.checkboxesToRemove).filter((checkbox) => (
      book.cover_edition_key != checkbox
    )).concat(book.cover_edition_key)

    let books = this.props.favorites.filter((favorite) => (
        (checkboxes.filter((checkbox) => (
          (favorite.cover_edition_key == checkbox)
        )).length > 0)
      ))

    books.map((book) => {
      Store.dispatch({
        type: "UNLIKE",
        favorite: book
      })
    })

    // uncheck the input fields
    let inputFields = document.querySelectorAll("input[type=checkbox]")
    for (var i=0; i<inputFields.length; i++){
      inputFields[i].checked = false
    }
  }

  displayTime(t){
    return (new Date(t).toString()).split(" GMT")[0]
  }

  render(){
    const {pageName, favorites} = this.props

    return (
      <div className={((pageName=="favorites")?"index ui":"hidden")}>

        <h1 className="ui header">My Favorites</h1>
        <hr className="ui divider" />

        <form onSubmit={this.handleSubmit.bind(this)}>
          <table className="ui very basic collapsing celled table">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Book name</th>
                <th>Added at</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
            {(favorites).map((book, i) => (
              <tr key={i}>
                <td>
                  <div className="ui checkbox">
                    <input type="checkbox"
                      ref={"fav-"+i}
                      onChange={this.handleCheckboxChange.bind(this)}
                      value={book.cover_edition_key} />
                    <label htmlFor={"fav-"+i} >{i+1}</label>
                  </div>
                </td>
                <td>{book.title_suggest}</td>
                <td>{this.displayTime(book.likedAt)}</td>
                <td>
                  <button
                    onClick={this.removeBook.bind(this, book)}
                    className="ui red basic tiny button">
                    <i className="remove circle icon"></i>
                    <span>Remove</span>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </form>

      </div>
    )
  }
}
