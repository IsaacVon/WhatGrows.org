import React, { Component } from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Input: liked: boolean
// Output: onClick
class Like extends Component {
  render() { 
    if(this.props.liked) return <FavoriteIcon />
    if(!this.props.liked) return <FavoriteBorderIcon />

  
  }
}
 
export default Like;