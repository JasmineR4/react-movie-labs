import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import MovieCard from "../movieCard";
import Grid from "@mui/material/Grid";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, credits, recommendations }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Typography variant="h5" component="h4">
        Credits
      </Typography>
      <Typography variant="h6" component="h3">
        Cast:
      </Typography>
      <Paper component="ul" sx={{ ...root }}>

        {credits.cast.map((castMember) => (
          <li key={castMember.cast_id}>
            <Chip label={`${castMember.name} as ${castMember.character}`} />
          </li>
        ))}

      </Paper>
      <Typography variant="h6" component="h4">
        Crew:
      </Typography>
      <Paper component="ul" sx={{ ...root }}>

        {credits.crew.map((crewMember) => (
          <li key={crewMember.credit_id}>
            <Chip label={`${crewMember.name} - ${crewMember.job}`} />
          </li>
        ))}
        
      </Paper>

      <Typography variant="h4" component="h3">
        Recommendations
      </Typography>
      <Grid container spacing={2}>
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <Grid item key={rec.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={rec} action={() => <></>} />
            </Grid>
          ))
        ): 
        
        ( <Typography>There are no recommendations available</Typography>)}
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>

  );

};


export default MovieDetails ;