import React from "react"
import News from "../modules/News"
import SearchBar from "./SearchBar"
import "../css/newsfeed.css"


class NewsFeed extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            isLoaded:false,
            news:[],
            likedItems:[],
            filteredNews: []
        }
        this.searchChange = this.searchChange.bind(this);
        this.likeNews = this.likeNews.bind(this);
        if (typeof(Storage) !== "undefined") {
            if(localStorage.getItem("likedNews")!==null){
                this.state.likedItems=JSON.parse(localStorage.getItem("likedNews"));
            }
            
        } else {
            alert("Sorry, your browser doesn't support this feature")
        }
        
    }
    
    
    /******************************** WORKING COMMENTS ***********************
    
    likeNews()  => invoked upon like button press.  
                         Checks if the headline and author are present in the array of liked elements. If yes, it unlikes that element else likes it. 
    searchChange()  => Used to filter displayed news based on search text. 
    
    componentDidMount() => Used to fetch API response and update state accordingly.
    
    In Render method, 'map' function is used for News elements, 'some' function is used to identify if the story is among the liked stories and if yes, it passes boolean value as a prop to the functional component - News.
    
    ***************************************************************************/
    
    
    likeNews(headline,author){
        
        if(this.state.likedItems.some((item)=>item.headline===headline && item.author===author)){
            let index = this.state.likedItems.findIndex((e)=>e.headline===headline && e.author===author)
            let arr = this.state.likedItems.slice()
            arr.splice(index,1);
            this.setState({likedItems:arr},()=>{
                if (typeof(Storage) !== "undefined") {
                    window.localStorage.setItem("likedNews",JSON.stringify(this.state.likedItems))
                } else {
                    alert("Sorry, your browser doesn't support this feature")
                }
            })
            
        } else {
            
            let arr = this.state.likedItems.slice()
            arr.push({headline: headline, author:author})
            this.setState({likedItems:arr},()=>{
                if (typeof(Storage) !== "undefined") {
                    window.localStorage.setItem("likedNews",JSON.stringify(this.state.likedItems))
                } else {
                    alert("Sorry, your browser doesn't support this feature")
                }
            })
            
        }
    }
    
    searchChange(event){
        let searchText = event.target.value;
        if (searchText!==""){
            this.setState({filteredNews : this.state.news.filter(item=>item.story.headline.toLowerCase().includes(searchText.toLowerCase()))})
        } else {
            this.setState({filteredNews: this.state.news});
        }
        
    }
    
    componentDidMount(){
        fetch("https://cors-anywhere.herokuapp.com/https://ace.qtstage.io/api/v1/collections/entertainment").then(response => response.json()).then((data)=>{ this.setState({isLoaded: true, news:data.items, filteredNews:data.items});}).catch(console.log);
         console.log("Component Mounted")
    }
    
    render(){
        console.log("Rendering...")
        if(!this.state.isLoaded){
            return <div> <SearchBar searchChange={this.searchChange} /> <h1 className="loading">Loading... </h1> </div>
        } else {
            return(
                <div>
                    <SearchBar searchChange={this.searchChange} />
                    <div className="newsfeed">

                        {this.state.filteredNews.map((item,index) => (
                            <div className="news-container" key={index}>
                                <News headline={item.story.headline} author={item.story["author-name"]} likeNews={this.likeNews} isLiked={this.state.likedItems.some((e)=>e.headline===item.story.headline && e.author===item.story["author-name"])}/>
                            </div>
                            ))};

                    </div>
                </div>
            )
        }
    }
}

export default NewsFeed