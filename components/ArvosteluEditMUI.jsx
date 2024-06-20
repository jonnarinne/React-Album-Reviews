import { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { editArvostelu } from '../components/arvostelut';

function ArvosteluEditMUI() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [arvostelu, setArvostelu] = useState({
        id: id,
        nimi: '',
        tekija: '',
        julkaisuvuosi: '',
        genre: '',
        tahdet: '',
        kuva: null
    });

    const [viesti, setViesti] = useState('');

    // Haetaan arvostelun tiedot
    useEffect(() => {
        const fetchArvostelu = async () => {
            try {
                const response = await fetch(`http://localhost:8080/arvostelu/one/${id}`);
                if (!response.ok) throw new Error('Tietojen haku epäonnistui');
                const data = await response.json();
                setArvostelu(data);
            } catch (error) {
                console.error('Virhe arvostelun hakemisessa:', error);
                setViesti('Virhe arvostelun hakemisessa');
            }
        };

        fetchArvostelu();
    }, [id]);


        const handleChange = (e) => {
            const { name, value } = e.target;
            setArvostelu(prevState => ({
            ...prevState,
            [name]: value
        }));
        };

        const handleEdit = async (id, arvostelu) => {
            try {
                const response = await editArvostelu (id, arvostelu);
                if (response.status === 200) {
                    navigate('/listaa');
                    } else {
                    console.error('Arvostelun muokkaaminen epäonnistui');
                    }
                } catch (error) {
                    console.error('Virhe arvostelun muokkauksessa', error);
                }
            };
            

    return (
        <Paper sx={{ padding: '20px', margin: '20px' }}>
            <Box component='form' autoComplete='off' sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>
          <Box marginBottom={3}>
            <TextField label='Levyn nimi' name='nimi' value={arvostelu.nimi} onChange={handleChange} />
          </Box>
          <Box marginBottom={3}>
            <TextField label='Artisti/bändi' name='tekija' value={arvostelu.tekija} onChange={handleChange} />
          </Box>
          <Box marginBottom={3}>
            <TextField label='Julkaisuvuosi' name='julkaisuvuosi' value={arvostelu.julkaisuvuosi} onChange={handleChange} />
          </Box>
          <Box marginBottom={3}>
            <TextField label='Genre' name='genre' value={arvostelu.genre} onChange={handleChange} />
          </Box>
          <Box marginBottom={3}>
            <TextField label='Arvostelu' name='tahdet' value={arvostelu.tahdet} onChange={handleChange} />
          </Box>
          <Box textAlign='center'>
            <Button onClick={handleEdit} variant='contained' sx={{ marginRight: 3 }}>Muokkaa arvostelua</Button>
        </Box>
        </Box>
                <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>

    </Paper>
      );
    };
    
    export default ArvosteluEditMUI;