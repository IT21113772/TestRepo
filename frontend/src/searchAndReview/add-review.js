import React, { useState } from "react";
import RestaurantDataService from "../services/product";
import { Link, Redirect  } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';

const AddReview = props => {
  var Review = " Review";
  let initialReviewState = ""
  let initialRatingState = 0
  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const [ratingValue, setRatingValue] = React.useState(initialRatingState);

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id,
      rating: ratingValue
    };

    if (editing) {
      data.review_id = props.location.state.currentReview._id
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const handleChange = (event, e) => {
    setValue(event.target.value);
    setReview(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"You submitted successfully!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">

              </DialogContentText>
            </DialogContent>

            <Box textAlign='center'>
              <Link to={"/restaurants/" + props.match.params.id} style={{ textDecoration: 'none' }}>
                <Button onClick={handleClose} sx={{ mb: 2 }}>Back to Product</Button>
              </Link>
            </Box>
          </Dialog>
        ) : (
          <div>
            <h5> Reviews are public and include your account name</h5> <br />
            <div className="form-group">
              <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />

              <TextField
                margin="normal"
                id="outlined-multiline-flexible"
                label={ editing ? "Edit" + Review : "Add" + Review}
                multiline
                maxRows={5}
                value={value}
                onChange={handleChange}
                fullWidth 
              />
            </div> <br />
            <Button 
              onClick={() => {
                saveReview();
                handleClickOpen();
              }}
              variant="contained" 
              color="success"
              disabled={!value}
            >
              Submit
            </Button>
          </div>
        )}
      </div>

      ) : (
      <div>
        <Redirect to="/login" />
      </div>
      )}

    </div>
  );
};

export default AddReview;