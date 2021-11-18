import * as React from 'react';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, } = props;

  return (
    <Box
      hidden={value !== index}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box style={{ height: '100%' }}>
          { children }
        </Box>
      )}
    </Box>
  );
}

export default TabPanel;