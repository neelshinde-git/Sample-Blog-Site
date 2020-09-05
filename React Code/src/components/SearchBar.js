import React from "react"

function SearchBar(props){
    
    return(
        <div className="top-container">
            <h3>StoryTeller</h3>
            <div className="searchbar">
                <input type="text" placeholder="Search..." onChange={props.searchChange}></input>
            </div>
        </div>
    )
    
}

export default SearchBar