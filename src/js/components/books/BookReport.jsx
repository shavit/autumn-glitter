import React, { Component } from "react"
import ReactDOM from "react-dom"
import {Store, BookReducer} from "../../reducers/book"


export default class BookReport extends Component {
  constructor(){
    super()

    const year = ((window.location.href.match(/report\/([0-9]{1,4})/))
      ?(window.location.href.match(/report\/([0-9]{1,4})/)[1])
      :((new Date()).getFullYear()))

    this.state = {
      year: year,
      month: (new Date()).getMonth(),
      width: 860,
      height: 620
    }
  }

  goToYear(year){
    const yearNow = (new Date()).getFullYear()
    if (year < 1970 || year == yearNow+1){
      return
    }

    this.setState({
      year: year,
      month: 0
    })
  }

  goToMonth(month){
    if (month < 0 || month == 12){
      return
    }

    this.setState({
      month: month
    })
  }

  displayTime(t){
    return (new Date(t).toString()).split(" GMT")[0].split(this.state.year)[0]
  }

  months(){
    return ["January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"]
  }

  generateChartData(chartData){
    let monthsNames = this.months()
    let firstDayOfTheYear = (new Date(this.state.year, 0, 1)).getTime()
    let firstDayOfNextYear = (new Date(this.state.year+1, 0, 1)).getTime()

    // only dates on the same year as the current year state
    let data = chartData.filter((d) => (
      (d.likedAt < firstDayOfNextYear && d.likedAt >= firstDayOfTheYear)
    ))

    let monthlyData = monthsNames.map((m, i) => {
      let firstDayOfTheMonth = (new Date(this.state.year, i, 1).getTime())
      let firstDayOfNextMonth = (new Date(this.state.year, i+1, 1).getTime())

      let days = data.filter((d) => (
        d.likedAt < firstDayOfNextMonth
        && d.likedAt >= firstDayOfTheMonth
      ))

      return {
        name: m,
        days: days
      }
    })


    let chart = {
        labels: this.months(),
        datasets: [
            {
                label: "Books",
                fill: true,
                backgroundColor: "rgba(205, 220, 57, 1)",
                borderColor: "rgba(175, 180, 43, 1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(189, 189, 189, 1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(240, 244, 195, 1)",
                pointHoverBorderColor: "rgba(189, 189, 189, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [90, 40, 60, 10, 48, 27, 44, 56, 28, 28],
                spanGaps: false,
            },
        ]
    }

    return monthlyData
  }

  handleSubmit(event){
    event.preventDefault()
  }

  render(){
    const {pageName, favorites} = this.props
    const {width, height} = this.state
    const summaryData = this.generateChartData(favorites)
    const monthSummary = summaryData[this.state.month]

    return (
      <div className={((pageName=="report")?"index ui":"hidden")}>

        <h1 className="ui header">Summary {this.state.year}</h1>
        <hr className="ui divider" />

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="ui buttons">
            <button
              onClick={this.goToYear.bind(this, this.state.year-1)}
              className="ui button">
              <i className="ui angle left icon">&nbsp;</i>
            </button>
            <button
              onClick={this.goToYear.bind(this, this.state.year+1)}
              className="ui button">
              <i className="ui angle right icon">&nbsp;</i>
            </button>
          </div>

          <div className="ui">
            <strong>CHART</strong>
          </div>

          <table className="ui selectable single teal line table">
            <thead>
              <tr>
                <th className="six wide">Month</th>
                <th className="five wide">Bookmarks I made</th>
                <th className="five wide">The first book I read</th>
              </tr>
            </thead>
            <tbody>
              {(summaryData).map((m, i) => (
                <tr key={i}
                  onClick={this.goToMonth.bind(this, i)}>
                  <td className="six wide">
                    <span
                      className={(m.name == this.months()[this.state.month])?"ui teal ribbon label":""}>
                        {m.name}
                      </span>
                  </td>
                  <td className="five wide">
                    {m.days.length}
                  </td>
                  <td className="five wide">
                    {(m.days.length > 0)
                    ?(m.days[0].title_suggest)
                    :null}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className="six wide">Total</th>
                <th className="five wide">{(summaryData).reduce((t, x) => t+x.days.length, 0)}</th>
                <th className="five wide">&nbsp;</th>
              </tr>
            </tfoot>
          </table>

          <h2 className="ui header">
            {(this
                .months()[this.state.month])
                .split()
                .map((x) => x.charAt(0)+x.slice(1))}
                &nbsp;
                {this.state.year}
          </h2>
          <hr className="ui divider" />
          <div className="ui buttons">
            <button
              onClick={this.goToMonth.bind(this, this.state.month-1)}
              className="ui button">
              <i className="ui angle left icon">&nbsp;</i>
            </button>
            <button
              onClick={this.goToMonth.bind(this, this.state.month+1)}
              className="ui button">
              <i className="ui angle right icon">&nbsp;</i>
            </button>
          </div>

          <table className="ui single teal line table">
            <thead>
              <tr>
                <th className="four wide">&nbsp;</th>
                <th className="six wide">Book name</th>
                <th className="six wide">Added at</th>
              </tr>
            </thead>
            <tbody>
              {(monthSummary.days).map((m, i) => (
                <tr key={i}>
                  <td className="four wide">{i+1}</td>
                  <td className="six wide">{m.title_suggest}</td>
                  <td className="six wide">{this.displayTime(m.likedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </form>

      </div>
    )
  }
}
