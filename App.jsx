import { Box, CssBaseline } from '@mui/material';
import Haku from './components/Haku';
import Levylista from './components/Levylista';
import Lomake from './components/Lomake';
import Etusivu from './components/Etusivu';
import ArvosteluEditMUI from './components/ArvosteluEditMUI';


import TabMUI from './muinavi/TabMUI';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import {grey } from '@mui/material/colors';
import { createBrowserRouter, RouterProvider,  useRouteError, isRouteErrorResponse, Link  } from 'react-router-dom';


const arvostelut = [
  { 
  id: 1, 
  nimi: 'Taipumaton',
  tekija: 'Kaija Koo',
  julkaisuvuosi: '2021',
  genre: 'pop',
  kuva: 'images/tammi.PNG',
  tahdet: '3'
  },
]

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: grey[600],
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Dancing Script', 'cursive'",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url('/kuvia/taustakuva.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});

    function Error () {
      let error = useRouteError();
      if (isRouteErrorResponse(error)) {
        return (
        <Box>
          {error.status} {error.data}
          <Link to='/'>Etusivulle</Link>
        </Box> );
      }
      return (
      <Box>
        {error.message} <Link to='/'>Etusivulle</Link>
      </Box> );
    }

    const router = createBrowserRouter([
      {
        element: <TabMUI arvostelut={arvostelut} />,
        errorElement: <Error />,
          children: [
          {
          path: '/',
          element: <Etusivu/>
          },
          {
          path: 'hae',
          element: <Haku arvostelut={arvostelut}/>,
          },
          {
          path: 'listaa',
          element: <Levylista arvostelut={arvostelut}/>
          },
          {
            path: 'lisaa',
            element: <Lomake/>,
          },
          {
            path: 'arvostelu/edit/:id/:nimi/:tekija/:julkaisuvuosi/:genre/:tahdet',
            element: <ArvosteluEditMUI/>,
          },

          ] 
      },
      ]);


function App() {

  return (
    <ThemeProvider theme={ theme }>
    <Box>
      <CssBaseline />
      <RouterProvider router={router} />
      
    </Box>
    </ThemeProvider>

  )
}

export default App
