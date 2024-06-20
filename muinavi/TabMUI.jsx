import { useState } from 'react';
import { Box, AppBar, Tabs, Tab } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link, Outlet } from 'react-router-dom';

function TabMUI({ levyt }) {

  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange} textColor='inherit'
         centered>
          <Tab label='Etusivu' icon={<MusicNoteIcon />} component={Link} to='/' />
          <Tab label='Haku' icon={<SearchIcon />} component={Link} to='hae' />
          <Tab label='Arvostelut' icon={<StarIcon />} component={Link} to='listaa' />
          <Tab label='Tee arvostelu' icon={<CreateIcon />} component={Link} to='lisaa' />
        </Tabs>
      </AppBar>
    <Outlet/>
    </Box>
  );
}

export default TabMUI;