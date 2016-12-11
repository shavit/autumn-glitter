import React, { Component } from "react"
import ReactDOM from "react-dom"
import {Store, BookReducer} from "../../reducers/book"

export default class BookReport extends Component {
  constructor(){
    super()
  }

  render(){
    const {pageName, favorites} = this.props
    return (
      <div className={((pageName=="report")?"index ui":"hidden")}>

        <h1 className="ui header">BOOK REPORT</h1>
        <hr className="ui divider" />

        <div className="">
          REPORT
        </div>

      </div>
    )
  }
}
