import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import {
  fetchRandomMovies,
  fetchTrendingMovies,
  fetchCarouselMovies
  } from '../../actions';

import { homeStyles } from '../../styles';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Carousel from '../carousel/Carousel';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      randomMovieId : '',
      redirectRandomMovie : false
    }
  }

  componentDidMount() {
    // Fetch movies for the movie carousel:
    this.props.fetchCarouselMovies();
    this.props.fetchTrendingMovies();
  }

  componentDidUpdate(prevProps){
    // Check if fetchRandomMovies() has been called:
    if(prevProps.randomMovies !== this.props.randomMovies) {
      this.selectRandomMovie();
    }
  }

  getRandomMovie() {
    this.props.fetchRandomMovies();
  }

  selectRandomMovie() {
    const movieList = this.props.randomMovies;

    // Select a movieId from array (random number between 0 and 19)
    const randomMovieId = movieList[Math.floor(Math.random() * 19)].id;
    this.setState({randomMovieId, redirectRandomMovie : true});
  }

  render() {

  const { randomMovieId, redirectRandomMovie } = this.state;
  const {
    classes,
    configuration,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    trendingMovies,
    showCarousel } = this.props;

  return (
    <React.Fragment>
      {redirectRandomMovie ? <Redirect push to={`/movie/${randomMovieId}`} /> : null}
        <Header />
        <main>
        <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Movie Selector
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Link className={classes.link} to={`/search`} >
                        <Button variant="contained" color="primary">
                          Search for movies
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary" onClick={this.getRandomMovie.bind(this)}>
                        Pick a random movie
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          <div className={classes.mainContainer}>
            {/* End hero unit */}
            {!showCarousel ? <h1>Loading...</h1> :
              <React.Fragment>
              <Carousel title="Popular" config={configuration} movies={popularMovies} />
              <Carousel title="Top Rated" config={configuration} movies={topRatedMovies} />
              <Carousel title="Upcoming" config={configuration} movies={upcomingMovies} />
              </React.Fragment>
            }
          </div>
        </main>
        <Footer trendingMovies={trendingMovies} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  configuration : state.configuration,
  popularMovies : state.popularMovies,
  topRatedMovies : state.topRatedMovies,
  upcomingMovies : state.upcomingMovies,
  randomMovies : state.randomMovies,
  trendingMovies : state.trendingMovies,
  showCarousel : state.popularMovies.length !== 0
    && state.topRatedMovies.length !== 0
    && state.upcomingMovies.length !== 0
});

const mapDispatchToProps = dispatch => ({
  fetchCarouselMovies: () => dispatch(fetchCarouselMovies()),
  fetchTrendingMovies: () => dispatch(fetchTrendingMovies()),
  fetchRandomMovies: () => dispatch(fetchRandomMovies()),
});

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(homeStyles)(Home));