import Container from '@mui/material/Container';
import Navbar from './common/Navbar/Navbar.js';
import Footer from './common/Footer/Footer.js';
import TabPanel from './common/TabPanel/TabPanel.js';
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import './App.css';
import { useState } from 'react';
import Activity from './sections/Activity.js';
// import Games from './sections/games/Games.js';
import Users from './sections/Users.js';

window.url = 'http://localhost:8000'

function App() {
  const [tabValue, setTabvalue] = useState(0);

  return (
    <Container>
      <Navbar/>
        <Box id='content'>
          <Grid id='grid-container' container spacing={3}>
            <Grid item xl={3}>
            <Tabs
              id='menu'
              orientation="vertical"
              variant="scrollable"
              value={tabValue}
              onChange={(event, newValue) => setTabvalue(newValue)}
              // sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Historial" />
              {/* <Tab label="Juegos" /> */}
              <Tab label="Usuarios" />
            </Tabs> 
            </Grid>
            <Grid item xl={9}>
              <Paper id='section'>
                <TabPanel value={tabValue} index={0}><Activity/></TabPanel>
                {/* <TabPanel value={tabValue} index={1}> <Games/> </TabPanel> */}
                <TabPanel value={tabValue} style={{ height: '100%' }} index={1}><Users/></TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      <Footer/>
    </Container>
  );
}

export default App;