import React from "react"
import NewsFeed from "./NewsFeed"

//------------- CSS imports
import "../css/app.css"
import "../css/searchbar.css"


class App extends React.Component{
    render(){
        return(
            <div>
                <NewsFeed />
            </div>
        )
    }
}

export default App