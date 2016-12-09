import {createStore} from "redux"
import {Provider, connect} from "react-redux"

export const BookReducer = function(state, action){
  if (state == undefined){
    return {}
  }

  switch(action.type){
    case "CREATE":
      state.books = action.books
      state.favorites = action.favorites
      break

    case "UPDATE":
      state.books = action.books
      break

    case "LIKE":
      state.favorites = (state.favorites)
        ?(state.favorites).filter((book) => (
          book.cover_edition_key != action.favorite.cover_edition_key
        )).concat(action.favorite)
        :(new Array(action.favorite))

        try {
          localStorage.setItem("favoritesState", JSON.stringify(state.favorites))
        } catch(err) {
          console.log("Error saving favorites to local storage")
        }
      break

    case "UNLIKE":
      state.books = action.books
      state.favorites = (state.favorites)
        ?(state.favorites).filter((book) => (
          book.cover_edition_key == action.favorite.cover_edition_key
        ))
        :(new Array())

        try {
          localStorage.setItem("favoritesState", JSON.stringify(state.favorites))
        } catch(err) {
          console.log("Error saving favorites to local storage")
        }
      break

    default:
      break
  }

  return state
}

const BookStorage = localStorage.getItem("bookState")
  ? JSON.parse(localStorage.getItem("bookState"))
  : []
export const Store = createStore(BookReducer, BookStorage)
