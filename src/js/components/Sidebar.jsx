import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Store, BookReducer} from "../reducers/book"



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

  findBooks(event){
    event.preventDefault()

    let termDOM = ReactDOM.findDOMNode(this.refs.searchTerm)
    let term = termDOM.value.trim()

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
    let books = this.state.books.filter((book) => (
      book.name.match(re)
    ))

    this.setState({
      books: books,
    })

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
        <form className="ui form" onSubmit={this.findBooks.bind(this)}>
          <fieldset className="field">
            <label>
              <input placeholder="Search" type="text" ref="searchTerm" onChange={this.filterBooks.bind(this)} />
            </label>
          </fieldset>
        </form>

        <h4 className="title">({favorites.length}) My favorites</h4>
        <div className="ui relaxed divided list">
          {(favorites).map((fav, i) => (
            <div className="item" key={i}>
              <div className="content">
                <span className="header">{fav.title_suggest}</span>
              </div>
            </div>
          ))}
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
