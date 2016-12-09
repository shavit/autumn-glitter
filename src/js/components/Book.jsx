import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Book extends Component {
  render(){
    return (
      <div>
        <p>Hello</p>
      </div>
    )
  }
}

const appDOM = document.getElementById("app")
if (appDOM != undefined){
  ReactDOM.render(<Book />,
    appDOM)
}
