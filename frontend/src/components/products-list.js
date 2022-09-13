import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/product";
import { Link } from "react-router-dom";

import BlueBerryImage from '../images/local-farms-organic-mixed-berries-frozen.jpg'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Products"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Products"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div>
      <div className="row pb-1 mb-2 mt-4">
        <div className="input-group col-lg">
          <TextField
            id="outlined-basic" 
            label="Product Name" 
            variant="outlined"
            type="text"
            className="form-control"
            placeholder="Search by product name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div >
            <Button
              sx={{ ml: 2 }}
              style={{minWidth: '90px', minHeight: '55px'}}
              variant="outlined"
              type="button"
              onClick={findByName}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="input-group col-lg">
          <TextField
            id="outlined-basic" 
            label="Product Code" 
            variant="outlined"
            type="text"
            className="form-control"
            placeholder="Search by product code"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <Button
              sx={{ ml: 2 }}
              style={{minWidth: '90px', minHeight: '55px'}}
              variant="outlined"
              type="button"
              onClick={findByZip}
            >
              Search
            </Button>
          </div>
        </div>
        <div className="input-group col-lg">
        <FormControl sx={{ minWidth: 185 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Available Products</InputLabel>
          <Select 
            onChange={onChangeSearchCuisine}
            label="Available Products"
            autoWidth
          >
             {cuisines.map(cuisine => {
               return (
                 <MenuItem value={cuisine}> {cuisine.substr(0, 18)} </MenuItem>
               )
             })}
          </Select>
        </FormControl>
          <div className="input-group-append">
            <Button
              sx={{ ml: 2, mb: 2 }}
              style={{minWidth: '90px', minHeight: '55px'}}
              variant="outlined"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </Button>
          </div>

        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          return (
            <div className="col-lg-4 pb-1">
              <div>
                <div>
                  {/* <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    <button className="btn btn-primary col-lg-5 mx-1">View Bakery Item</button>
                    <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 ">
                      View Reviews
                    </Link>
                  </div> */}

                  <Card sx={{ maxWidth: 400, mb: 4 }}>
                    <Link to={"/restaurants/"+restaurant._id} style={{ textDecoration: 'none', color: '#000' }}>
                      <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Products"
                            height="140"
                            image={BlueBerryImage}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {restaurant.name}
                            </Typography>
                            <Stack spacing={1}>
                              <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} size="small" readOnly />
                            </Stack>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              A discription of the bakery item
                            </Typography>
                          </CardContent>
                          </CardActionArea>
                        </Link>

                        <CardActions>
                          <ShoppingCartIcon sx={{ mr: 1 }} color="primary"/>
                          <Button size="small">Add to Cart</Button>
                        </CardActions>        
                      </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;