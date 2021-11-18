import * as React from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState, useEffect } from 'react';

function Activity(props) {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetch(`${window.url}/actions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoadingData(false);
      })
      .catch(error => console.log(error))
  }, []);

  const compareDates = (date1, date2) => {
    const date1Components = date1.split("/");
    const date2Components = date2.split("/");

    const newDate1 = new Date(
      date1Components[2],
      date1Components[1] - 1,
      date1Components[0]
    );
    const newDate2 = new Date(
      date2Components[2],
      date2Components[1] - 1,
      date2Components[0]
    );

    return newDate2 - newDate1;
  }

  const compareTimes = (time1, time2) => {
    const time1Components = time1.split(":");
    const time2Components = time2.split(":");

    const component1Result = time2Components[0] - time1Components[0]
    const component2Result = time2Components[1] - time1Components[1]
    const component3Result = time2Components[2] - time1Components[2]
    
    if(component1Result == 0) {
      if(component2Result == 0) {
        return component3Result;
      } else {
        return component2Result;
      }
    } else {
      return component1Result;
    }
  }

  const compareDatesAndTimes = (a1, a2) => {
    const dateComparisonResult = compareDates(new Date(a1.date_time).toLocaleDateString(), new Date(a2.date_time).toLocaleDateString());
    return dateComparisonResult == 0
      ? compareTimes(new Date(a1.date_time).toLocaleTimeString(), new Date(a2.date_time).toLocaleTimeString())
      : dateComparisonResult;
  }

  const sortByMonth = (month, quantity) => {
    const dummy = [
      {
        game: 'galaga',
        date: '01/11/2021',
      },
      {
        game: 'galaga',
        date: '02/11/2021',
      },
      {
        game: 'galaga',
        date: '03/11/2021',
      },
      {
        game: 'galaga',
        date: '04/11/2021',
      },
      {
        game: 'galaga',
        date: '01/10/2021',
      },
      {
        game: 'galaga',
        date: '01/10/2021',
      },
      {
        game: 'asteroid',
        date: '01/11/2021',
      },
      {
        game: 'asteroid',
        date: '01/11/2021',
      },
      {
        game: 'asteroid',
        date: '01/10/2021',
      },
      {
        game: 'frogger',
        date: '01/11/2021',
      },
      {
        game: 'frogger',
        date: '02/11/2021',
      },
      {
        game: 'dig dug',
        date: '01/11/2021',
      },
    ]

    const dummyFiltered = dummy.filter(activity => activity.date.split('/')[1] === month)
    
    const dummyFilteredCount = {}
    dummyFiltered.map((activity => {
      dummyFilteredCount[activity.game] = dummyFilteredCount[activity.game] + 1 || 1;
    }))
    
    const dummyFilteredCountSorted = Object.entries(dummyFilteredCount).map(([game, timesPlayed]) => ({game, timesPlayed}));
    dummyFilteredCountSorted.sort((gc1, gc2) => gc2.timesPlayed - gc1.timesPlayed);

    return dummyFilteredCountSorted.slice(0, quantity);
  }

  return (
    <Box style={{ height: '100%' }}>
      {
        loadingData ?
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '100%' }}
        >
          <CircularProgress/>
        </Grid> :
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'><b>Usuario</b></TableCell>
                <TableCell align='center'><b>Juego</b></TableCell>
                <TableCell align='center'><b>Hora</b></TableCell>
                <TableCell align='center'><b>Fecha</b></TableCell>
                <TableCell align='center'><b>Monedas utilizadas</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.sort((a1, a2) => compareDatesAndTimes(a1, a2)).map((game, index) => {
                  return(
                  <TableRow key={index}>
                    <TableCell align='center'>{ game.user }</TableCell>
                    <TableCell align='center'>{ game.game }</TableCell>
                    <TableCell align='center'>{ (new Date(game.date_time)).toLocaleTimeString() }</TableCell>
                    <TableCell align='center'>{ (new Date(game.date_time)).toLocaleDateString() }</TableCell>
                    <TableCell align='center'>{ game.used_coins }</TableCell>
                  </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  );
}

export default Activity;