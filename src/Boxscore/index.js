import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import './style.css';

const halves = ['1', '2'];
const periods = ['1', '2', '3'];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const innings = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const gamePeriods = (league) => {
  switch (league) {
    case 'nhl':
      return periods
    case 'nba':
    case 'nfl':
    case 'ncaaf':
      return quarters
    case 'mlb':
      return innings
    default:
      return halves
  }
};

const getOvertimeLabel = (league, otPeriod) => {
  if (league === 'mls') {
    return `ET${otPeriod+1}`;
  } else if (league === 'mlb') {
    return otPeriod+10;
  } else if (otPeriod === 0) {
    return 'OT'
  } else {
    return `${otPeriod+1}OT`;
  }
}

const scoreSection = (team) => (
  <Grid className="boxscore-grid-styling">
    <Box className="boxscore-box-styling" color={team.color}>{team.abbreviation}</Box>
    {team.scoring.map((score, index) => <Box key={index} className="score">{score}</Box>)}
    <Box className="score" borderLeft="1px solid #c2c2c2">{team.score}</Box>
    {team.hits && team.errors && (
      <>
        <Box className="score" borderLeft="1px solid #c2c2c2">{team.hits}</Box>
        <Box className="score" borderLeft="1px solid #c2c2c2">{team.errors}</Box>
      </>
    )}
  </Grid>
);

const teamInfo = (team) => (
  <Box width="40%" backgroundColor={team.color} padding="5px" color="#f2f2f2" borderRadius="0px 0px 3px 3px">
    <Typography variant='h5' fontWeight="bold">{team.nickname.toUpperCase()}</Typography>
    <Typography variant='subtitle2' marginTop="-5px">{team.record}</Typography>
  </Box>
);

const Boxscore = ({
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

  const displayGamePeriods = gamePeriods(game.league.toLowerCase()).map(period => <Box key={period} className="boxscore-box-styling" fontSize="14px">{period}</Box>);

  if (displayGamePeriods.length < game.awayTeam.scoring.length) {
    for (let i=0; i<=(game.awayTeam.scoring.length - displayGamePeriods.length); i++) {
      displayGamePeriods.push(<Box className="boxscore-box-styling" fontSize="14px">{getOvertimeLabel(game.league.toLowerCase(), i)}</Box>)
    }
  }

  return (
    <Box className="boxscore">
      <Box>
        <Typography
          variant='subtitle2'
          fontStyle="italic"
          marginY="8px"
        >
          {`${game.home_team.site_name} - ${game.home_team.city}, ${game.home_team.state}`}
        </Typography>
      </Box>
      <Grid
        className="boxscore-periods"
        marginY="0px"
        paddingY="5px"
      >
        <Box className="boxscore-box-styling" />
        {displayGamePeriods}
        {game.league.toLowerCase() === 'mlb' ? (
          <>
            <Box className="boxscore-box-styling" fontSize="14px">R</Box>
            <Box className="boxscore-box-styling" fontSize="14px">H</Box>
            <Box className="boxscore-box-styling" fontSize="14px">E</Box>
          </>
        ) : (
          <Box className="boxscore-box-styling" fontSize="14px">{game.eventInfo.status === 'Final' && 'F'}</Box>
        )}
      </Grid>
      {scoreSection(game.awayTeam)}
      {scoreSection(game.homeTeam)}
      <Grid className="boxscore-grid-styling" borderRadius="4px">
        {teamInfo(game.awayTeam)}
        <Box width="20%" display="flex" justifyContent="center" alignItems="center">
          <Typography variant='subtitle2' fontWeight="bold">{game.eventInfo.status}</Typography>
        </Box>
        {teamInfo(game.homeTeam)}
      </Grid>
    </Box>
  );
}

export default Boxscore;
