import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Boxscore from './Boxscore';
import ScorePreview from './ScorePreview';
import './App.css';

const App = () => {
  const [selectedGameId, setSelectedGameId] = useState();

  return (
    <div className="App">
      <div className="App-header" href="styles.css">
        <Grid display="flex" flexDirection="row">
          <Grid
            display="flex"
            flexDirection="column"
            width="fit-content"
            paddingRight="10px"
            marginRight="40px"
            overflow="scroll"
            height="96vh"
          >
            <div type="button" onClick={() => setSelectedGameId('6c974274-4bfc-4af8-a9c4-8b926637ba74')}>
              <ScorePreview id="6c974274-4bfc-4af8-a9c4-8b926637ba74" />
            </div>
            <div type="button" onClick={() => setSelectedGameId('eed38457-db28-4658-ae4f-4d4d38e9e212')}>
              <ScorePreview id="eed38457-db28-4658-ae4f-4d4d38e9e212" />
            </div>
          </Grid>
          {selectedGameId && (
            <Boxscore key={selectedGameId} id={selectedGameId} />
          )}
        </Grid>
      </div>
    </div>
  );
}

export default App;
