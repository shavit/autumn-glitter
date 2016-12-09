import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Sidebar extends Component {
  render(){
    return (
      <div>
        <p>Sidebar</p>
      </div>
    )
  }
}

const appDOM = document.getElementById("sidebar")
if (appDOM != undefined){
  ReactDOM.render(<Sidebar />,
    appDOM)
}
