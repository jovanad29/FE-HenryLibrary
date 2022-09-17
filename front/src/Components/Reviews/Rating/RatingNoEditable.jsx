import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styles from "./RatingNoEditable.module.css";


class RatingNoEditable extends React.Component {
 constructor(props){
    super(props)
 }
    render() {
    const { value } = this.props;
 
    return (                
      <div>       
        <StarRatingComponent 
          name="rate2" 
          editing={false}
          starCount={5}
          value={value}
          className={styles.star}
        />
      </div>
    );
  }
}

export default RatingNoEditable; 