import {createStore} from "redux"

export const BookReducer = function(state={}, action){

  switch(action.type){
    case "CREATE":
      state.books = action.books
      state.favorites = action.favorites
      break

    case "UPDATE":
      state.books = action.books
      break

    case "LIKE":
      action.favorite.liked = true

      // Try to update the state with favorites
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

      // Try to update the books from the store.
      // There are more available books in the store than
      //  in the current state.
      try {
        const currentBooks = JSON.parse(localStorage.getItem("bookState"))
        // Create new book store
        let books = (currentBooks)
          ?(currentBooks).map((book) => {
            if (book.cover_edition_key == action.favorite.cover_edition_key){
              return action.favorite
            }
            return book
          })
          :(new Array(action.favorite))

        // Save the books to the store
        localStorage.setItem("bookState", JSON.stringify(books))

      } catch(err){
        console.log("Error saving updated books to the store")
      }

      break

    case "UNLIKE":
      action.favorite.liked = false

      // Try to update the state with favorites
      state.favorites = (state.favorites)
        ?(state.favorites).filter((book) => (
          book.cover_edition_key != action.favorite.cover_edition_key
        ))
        :(new Array())

      try {
          localStorage.setItem("favoritesState", JSON.stringify(state.favorites))
        } catch(err) {
          console.log("Error saving favorites to local storage")
        }

      // Try to update the books from the store.
      // There are more available books in the store than
      //  in the current state.
      try {
        const currentBooks = JSON.parse(localStorage.getItem("bookState"))
        // Create new book store
        let books = (currentBooks)
          ?(currentBooks).map((book) => {
            if (book.cover_edition_key == action.favorite.cover_edition_key){
              return action.favorite
            }
            return book
          })
          :(new Array(action.favorite))

        // Save the books to the store
        localStorage.setItem("bookState", JSON.stringify(books))

      } catch(err){
        console.log("Error saving updated books to the store")
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
