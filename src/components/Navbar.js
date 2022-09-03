import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'2px'}}>
      <Link to='/' style={{textDecoration:'none'}}><h1>Movies App</h1></Link>
      <Link to='/favourites' style={{textDecoration:'none'}}><h4 style={{marginLeft:'2rem',marginTop:'1rem'}}>Favrouites</h4></Link>  
      </div>
    )
  }
}
