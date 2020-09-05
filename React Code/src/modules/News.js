import React from "react"
import "../css/news.css"

function News(props){
    let className = "like"
    if(props.isLiked)
        className="like show"
    return(
        <div className="news">
            <p className="headline"><b>{props.headline}</b></p>
            <button className={className} onClick={()=>props.likeNews(props.headline,props.author)}>&#10084;</button>
            <p className="author">{props.author}</p>
        </div>
    )
    
}

export default News