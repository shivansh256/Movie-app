import React, { Component } from 'react';
// import {movies} from './getMovies';
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    async componentDidMount(){
        
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0286652b03f5808d512d9fec67752bef&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })
    }
   
    changeMovies=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=0286652b03f5808d512d9fec67752bef&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })

    }
    handleRight=()=>{
        if(this.state.currPage==this.state.parr.length)
        {
            let temparr=[]
            for(let i=1;i<=this.state.parr.length+1;i++){
                temparr.push(i);
            }
            this.setState({
                parr:[...temparr],
                currPage:this.state.currPage+1
            },this.changeMovies)

        }
        else{
            this.setState({
                currPage:this.state.currPage+1
            },this.changeMovies)
        }
        
    }

    handleLeft=()=>{
        if(this.state.currPage!=1)
        {
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
        
    }

    handleClick=(x)=>{
        this.setState({
            currPage:x
        },this.changeMovies)
    }


    handleFavourites=(movie)=>{
        let oldData=JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData=JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        console.log(temp);
        this.setState({
            favourites:[...temp]
        })
        console.log(this.state.favourites);
    }


    // handleFavourites=(movie)=>{
    //     let oldData=JSON.parse(localStorage.getItem("movies-appss") || "[]");
    //     if(this.state.favourites.includes(movie.id))
    //     {
    //         oldData=oldData.filter((movieObj)=>
    //             movieObj.id!=movie.id
    //         )

    //     }
    //     else{
    //         oldData.push(movie);
    //     }

    //     localStorage.setItem("movies-appss",JSON.stringify(oldData));
    //     console.log(oldData);
    //     this.handlestatefavourites();
    // }
    // handlestatefavourites=()=>{
    //     let oldData=JSON.parse(localStorage.getItem("movies-app") || "[]");
    //     let temp=oldData.map((m)=>m.id);

    //     this.setState({
    //         favourites:[...temp]

    // })

    // }
  render() {
    //   let movie=movies.results;
    return (
        <>
      {
          this.state.movies.length === 0?
          <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>:
        <div>
        <h3 className='text-center'><strong>Trending</strong></h3>
        <div className='movie-list'>
            {
                this.state.movies.map((movieObj)=>(
                    <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                        <img className="card-img-top movieImage" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title}/>
                            <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                            <div className='button-wrapper' style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                {
                                    this.state.hover===movieObj.id &&
                                    <a onClick={()=>this.handleFavourites(movieObj)} className="btn btn-primary movie-button">{this.state.favourites.includes(movieObj.id)?"remove from favourites":"Add to favourites"}</a>
                                }
                            
                            </div>
                    </div>

                ))

            }
        </div>
        <div className='page-nation' style={{display:'flex',justifyContent:'center'}}>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {
                        this.state.parr.map((value)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                    }
                   
                   
                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
            </nav>
        </div>
        </div>
        

      }
      </>
    )
  }
}
