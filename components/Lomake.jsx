import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, InputLabel} from '@mui/material';
import Rating from '@mui/material/Rating';
import AttachmentIcon from '@mui/icons-material/Attachment';

import { addArvostelu } from '../components/arvostelut';

import { useNavigate } from 'react-router-dom';



function Lomake() {
  const navigate = useNavigate();

  const [arvostelu, setArvostelu] = useState({
    nimi: '',
    tekija: '',
    julkaisuvuosi: '',
    genre: '',
    kuva: [],
    tahdet: 0 

  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setArvostelu({
      ...arvostelu,
      [e.target.name]: e.target.value
    });
    setViesti('');
  };

  const muutaKuva = (e) => {
    setValues({
      ...arvostelu,
      kuva: e.target.files[0]
    });

    setViesti('');
  }

  const muutaTahdet = (e, newValue) => {
    setArvostelu({
      ...arvostelu,
      tahdet: newValue
    });
  };
    
  const lisaaArvostelu = async () => {
    const formData = new FormData();

    formData.append('nimi', arvostelu.nimi);
    formData.append('tekija', arvostelu.tekija);
    formData.append('julkaisuvuosi', arvostelu.julkaisuvuosi);
    formData.append('genre', arvostelu.genre);
    formData.append('kuva', arvostelu.kuva);
    formData.append('tahdet', arvostelu.tahdet);

    try {
      const response = await addArvostelu(formData);
      if (response.status == 200) {
        navigate('/listaa');
      } else {
        navigate('/virhe/Lisäys ei onnistunut');
      }

    } catch (error) {
      navigate('/virhe/Lisäys ei onnistunut');
    }
  }

  const tyhjenna = () => {
    setArvostelu({
      nimi: '',
      tekija: '',
      julkaisuvuosi: '',
      genre: '',
      kuva: null,
      tahdet: 0
    });
    setViesti('');
  };


let kuvaNimi = '';
  if (arvostelu.kuva !== null) {
    kuvaNimi = arvostelu.kuva.name;
  }

  return (
    <Paper sx={{ padding: '20px', margin: '20px' }}>
      <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>
        <Box marginBottom={3}>
          <TextField label='Levyn nimi' name='nimi' value={arvostelu.nimi} onChange={muuta} />
        </Box>
        <Box marginBottom={3}>
          <TextField label='Artisti/bändi' name='tekija' value={arvostelu.tekija} onChange={muuta} />
        </Box>
        <Box marginBottom={3}>
          <TextField label='Julkaisuvuosi' name='julkaisuvuosi' value={arvostelu.julkaisuvuosi} onChange={muuta} />
        </Box>
        <Box marginBottom={3}>
          <TextField label='Genre' name='genre' value={arvostelu.genre} onChange={muuta} />
        </Box>

        <Box marginBottom={3}>
        <Typography sx={{ marginBottom: 2 }}>Arvostelu</Typography>
          <Box sx={{ display: 'inline-block', marginLeft: 1 }}>
          
          <Rating
            name='tahdet'
            value={arvostelu.tahdet}
            onChange={muutaTahdet}
          />

        <input accept='image/*' name='kuva' id='kuva' type='file'
          onChange={(e) => muutaKuva(e)} hidden />

        <InputLabel htmlFor='kuva'>
          <Typography sx={{ display: 'inline' }}>Kuva</Typography>
          <Button component='span'>
            <AttachmentIcon />
          </Button>
          <Typography sx={{ display: 'inline' }}>{kuvaNimi}</Typography>
        </InputLabel>  

        </Box>
          </Box>
        <Box textAlign='left'>
          <Button onClick={lisaaArvostelu} variant='contained' sx={{ marginRight: 3 }}>Lisää</Button>
          <Button onClick={tyhjenna} variant='contained' color='secondary'>Peruuta</Button>
        </Box>
      </Box>
      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>
    </Paper>
  );
}

export default Lomake;