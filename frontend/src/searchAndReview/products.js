import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';

import RestaurantDataService from "../services/product";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
    rating: 0
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h3>{restaurant.name}</h3> <br />
          
          <Link to={"/restaurants/" + props.match.params.id + "/review"} style={{ textDecoration: 'none', color: '#fff' }}>
            <Button variant="contained" sx={{ mb: 2 }}>
              Add Review
            </Button>
          </Link>
          
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography variant="h6" component="div" sx={{ mb: 1, wordWrap: 'break-word', width: '24rem', }}>
                            {review.text}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>User: </strong>{review.name}<br/>
                            <strong>Date: </strong>{Moment(review.date).format('LLLL')}
                          </Typography>

                          <Rating name="read-only" value={review.rating} size="small" readOnly />

                        </CardContent>
                        <CardActions sx={{ mt: -2 }}>
                          {props.user && props.user.id === review.user_id &&
                            <div className="row">
                                <Link to={{
                                  pathname: "/restaurants/" + props.match.params.id + "/review",
                                  state: {
                                    currentReview: review
                                  }
                                }} style={{ textDecoration: 'none'}} >
                                  <Button size="medium">
                                    Edit Review
                                  </Button>
                                </Link> <br /><br />

                                <a onClick={() => deleteReview(review._id, index)}>
                                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete Review
                                  </Button>
                                </a>
                            </div>                   
                          }
                        </CardActions>
                      </Card>
                      <br />
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No product selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;