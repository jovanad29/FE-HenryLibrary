import React from 'react';
import styles from "./Rating.module.css";
import StarRatingComponent from 'react-star-rating-component';
 



class Rating extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      rating: 1
    }
  }


  onStarClick = (nextValue, prevValue, name) => {
      this.setState({rating: nextValue});
      this.props.setReviews(nextValue);
  }

  componentDidMount(){
    this.setState({rating: this.props.rating});
  }
 
  render() {
 
    const { rating } = this.props;
    
    return (                
      <div className={styles.containerRating}>
      <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick}
          className={styles.star} 
        />
      </div>
    );
  }
}
export default Rating; 
