//
//  Set the state of the app based on URL path
//

export default class Router {
  constructor(){
    // const basePath = /src\/html/
    const path = (window.location.href.split("/#!")[1])
      ?(window.location.href.split("/#!")[1])
      :(window.location.pathname.split("/")[1])

    this.actions = []
    this.state = {
      baseURL: window.location.protocol+"://"+window.location.host,
      path: path,
      action: (path || "index")
    }

    this.dispatch()
    this.publish(path)
  }

  subscribe(callback){
    let i = this.actions.push(callback)

    return {
      remove: () => {
        delete this.actions[i-1]
      }
    }
  }

  publish(data){
    this.actions.map((action) => {
      action(data)
    })
  }

  _href(slug){
    return ((window.history && window.history.pushState)
        ?("/")
        :("#!/"))
      +slug
  }

  url(slug){
    let newPath = this._href(slug)

    // Change the URL
    if (window.history && window.history.pushState){
      window.history.pushState(window.document.title, window.document.title, newPath)
    } else {
      window.location.hash="!/"+slug
    }

    // Set the state
    this.state.path = newPath
    this.state.action = slug

    // Action
    this.publish(slug)
  }

  dispatch(){
    window.onclick = (event) => {
      (event.target.localName == "a")
        ?(event.preventDefault())
        :null
    }
  }

}

export const router = new Router()
