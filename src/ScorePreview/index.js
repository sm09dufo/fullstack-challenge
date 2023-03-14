import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import './style.css';

const ScorePreview = ({
  id
}) => {
  const [game, setGame] = useState();

  useEffect(() => {
    fetch(
      `http://localhost:5050/game/${id}`)
        .then((res) => res.json())
        .then((json) => setGame(json))
  }, []);

  if (!game || game === undefined) {
    return null;
  }

  return (
    <Box className="score-preview">
      <Grid className="score-preview-status">
        {game.eventInfo.status}
      </Grid>
      <Grid className="grid-styling" borderBottom="1px solid #c2c2c2">
        <Box className="team" backgroundColor={game.awayTeam.color}>{game.awayTeam.abbreviation}</Box>
        <Box className="box-styling">{game.awayTeam.score}</Box>
      </Grid>
      <Grid className="grid-styling">
        <Box className="team" borderRadius="0px 0px 0px 3px" backgroundColor={game.homeTeam.color}>{game.home_team.abbreviation}</Box>
        <Box className="box-styling">{game.homeTeam.score}</Box>
      </Grid>
    </Box>
  );
}

export default ScorePreview;
