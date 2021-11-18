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


function Users(props) {
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetch(`${window.url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoadingData(false);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const getImageName = (originalName) => {
    const imageExtension = originalName.substr(originalName.lastIndexOf('.'));
    return imageExtension;
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
                <TableCell align='center'><b>Afiliación</b></TableCell>
                {/* <TableCell align='center'><b>Imagen</b></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.map((user, index) => {
                  return(
                  <TableRow key={index}>
                    <TableCell align='center'>{ user.username }</TableCell>
                    <TableCell align='center'>{ user.date_joined }</TableCell>
                    {/* <TableCell align='center'>
                      <img src={require(`/media/dimi/easystore/Austral/2021 - B/Introducción a la Computación/Práctica/server/users_photos/${ user.username }.jpg`)} width="150"/>
                    </TableCell> */}
                  </TableRow>
                )})
              }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  );
}

export default Users;