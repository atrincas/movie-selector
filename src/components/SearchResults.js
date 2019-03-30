import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

//CSS styles:
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  card: {
  	display: 'flex',
    width: 850,
  },
  image: {
  	minwidth: 154
  },
  img: {
    margin: 'auto',
    display: 'block',
    Width: '100%'
  },
  subtitle: {
  	display: 'flex',
  	justifyContent: 'space-between'
  },
  content: {
  	display: 'flex',
  	flexDirection: 'column'
  },
  link: {
  	alignSelf: 'flex-end',
  	textDecoration: 'none'
  }
});

class SearchResults extends Component {

	state = {
		movies : [],
		genresArray : []
	}

	displayGenres(ids) {
		let genres = [];

		ids.forEach(id => this.state.genresArray.forEach(genre => genre.id === id ? genres.push(genre.name) : null));
		
		return genres.toString();

	}

	render() {

		const { classes, movies, configuration } = this.props;

	    return (
	    	<Grid container className={classes.root} spacing={16}>
        		<Grid item xs={12}>
	          			<Grid container justify="center" spacing={16}>
	            		{movies.map(movie => (
	              			<Grid key={movie.id} item>
	                			<Card className={classes.card}>
	                				<ButtonBase className={classes.image}>
	                					<img className={classes.img} alt={movie.title} src={`${configuration.images.base_url + configuration.images.poster_sizes[2] + movie.poster_path}`} />
	                				</ButtonBase>
							      	<CardContent className={classes.content}>
								         <Grid item xs={12} sm container>
								            <Grid item xs container direction="column" spacing={8}>
								              <Grid item xs>
								                <Typography variant="title">
								                  {movie.title}
								                </Typography>
								              
								              	<div className={classes.subtitle}>
									                <Typography color="textSecondary">
									                	{movie.release_date.slice(0,4)}
									                </Typography>
									                <Typography gutterBottom color="textSecondary">
									                	{this.displayGenres(movie.genre_ids)}
									                </Typography>
								                </div>
								                <Typography variant="body2">{movie.overview}</Typography>
								               </Grid>
								                
								            </Grid>
								          </Grid>
								          	<Link className={classes.link} to={`/movie/${movie.id}`}>
								           <Button className={classes.button} size="small" color="primary">
								           	View More
								           </Button>
								           </Link>
							      	</CardContent>
							    </Card>
	              			</Grid>
	            		))}
	          		</Grid>
        		</Grid>
        	</Grid>
	    );
  	}
}

const mapStateToProps = state => {
		return {
			configuration : state.configuration,
			genresArr : state.genresArray,
			movies : state.searchResults,};
	};

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));
