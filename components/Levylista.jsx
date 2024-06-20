import { Grid, Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getArvostelut, deleteArvostelu} from '../components/arvostelut';
import { useNavigate } from 'react-router-dom';

function Levylista() {
  const navigate = useNavigate();
  const [arvostelut, setArvostelu] = useState([]);

  const haeKaikkiarvostelut = async () => {
    try {
      const response = await getArvostelut();
      if (response.status === 200) {
        setArvostelu(response.data);
      } else {
        navigate('/virhe/Haku ei onnistunut');
      }
    } catch (error) {
      navigate('/virhe/Haku ei onnistunut');
    }
  }

  useEffect(() => {
    haeKaikkiarvostelut();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await deleteArvostelu(id);
      if (response.status === 200) {
        // Päivitä arvostelulista poistamalla poistettu arvostelu
        setArvostelu(arvostelut.filter(arvostelu => arvostelu.id !== id));
      } else {
        console.error('Arvostelun poistaminen epäonnistui');
      }
    } catch (error) {
      console.error('Virhe arvostelun poistamisessa:', error);
    }
  };


  return (
    <Box ml="15%" mr="15%">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mt={8}>
            <Grid container spacing={2}>
              {arvostelut.map(arvostelu => (
                <Grid item key={arvostelu.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Card sx={{ height: '100%' }}>
                    <CardHeader title={arvostelu.nimi} subheader={arvostelu.tekija} />
                    {arvostelu.kuva ? (
                      <CardMedia
                        sx={{ height: 0, paddingTop: '56.25%' }}
                        image={'http://localhost:8080/download/' + arvostelu.kuva}
                        title={arvostelu.nimi}
                      />
                    ) : (
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">Ei kuvaa</Typography>
                      </CardContent>
                    )}

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">Julkaistu: {arvostelu.julkaisuvuosi}</Typography>
                      <Typography variant="body2" color="text.secondary">Genre: {arvostelu.genre}</Typography>
                      <Box mt={2}>
                        <Rating value={arvostelu.tahdet} readOnly size="small" />
                      </Box>
                    </CardContent>

                    <CardActions>
                    <IconButton color='primary' component={Link} to={'/arvostelu/edit/' + arvostelu.id + '/' + arvostelu.nimi +
                    '/' + arvostelu.tekija + '/' + arvostelu.julkaisuvuosi + '/' + arvostelu.genre + '/' + arvostelu.tahdet + '/' + ''}><EditIcon /></IconButton>
                      <IconButton color='secondary' onClick={() => handleDelete(arvostelu.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Levylista;