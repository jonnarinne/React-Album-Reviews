import React, { useState } from 'react';
import { Paper, Box, TextField, Button, Select, MenuItem, Grid, Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import { Rating } from '@mui/material';

function Haku() {
    const [arvostelut, setArvostelut] = useState([]);
    const [hakuperuste, setHakuperuste] = useState('julkaisuvuosi');
    const [arvo, setArvo] = useState('');
    const [haetaan, setHaetaan] = useState(false);

    const muuta = (e) => {
        setArvo(e.target.value);
        setHaetaan(false);
    }

    const hae = async () => {
        setHaetaan(true);
        await fetchArvostelut();
    }

    const fetchArvostelut = async () => {
        try {
            const response = await fetch(`http://localhost:8080/arvostelu/search/${hakuperuste}/${arvo}`);
            if (!response.ok) {
                throw new Error('Response not ok');
            }
            const data = await response.json();
            setArvostelut(data);
        } catch (error) {
            console.error('Error fetching arvostelut:', error);
        }
    }

    return (
        <Box>
            <Paper sx={{ padding: '20px', margin: '20px' }}>
                <Box component="form">
                    <Box marginBottom={2}>
                        <Select value={hakuperuste} onChange={(e) => setHakuperuste(e.target.value)}>
                            <MenuItem value='julkaisuvuosi'>Levyn julkaisuvuosi</MenuItem>
                            <MenuItem value='tekija'>Artisti/bändi</MenuItem>
                            <MenuItem value='nimi'>Levyn nimi</MenuItem>
                            <MenuItem value='genre'>Genre</MenuItem>
                        </Select>
                    </Box>
                    <Box marginBottom={2}>
                        <TextField label="Hae levyarvosteluja..." value={arvo} onChange={muuta} />
                    </Box>
                    <Box marginBottom={2}>
                        <Button variant="contained" onClick={hae}>Hae</Button>
                    </Box>
                </Box>
            </Paper>

            <Grid container spacing={2} sx={{ marginTop: 1, marginLeft: 1 }}>
                {arvostelut.map(arvostelu => (
                    <Grid item key={arvostelu.id}>
                        <Card sx={{ width: 230 }}>
                            <CardHeader title={arvostelu.nimi} subheader={arvostelu.tekija} />
                            {arvostelu.kuva ? (
                                <CardMedia
                                    sx={{ height: 100, width: 230 }}
                                    component='img'
                                    image={'http://localhost:8080/download/' + arvostelu.kuva}
                                    alt={arvostelu.kuvaus}
                                />
                            ) : (
                                <CardContent>
                                    <Typography>Ei kuvaa</Typography>
                                </CardContent>
                            )}
                            <CardContent>
                                <Typography>Julkaistu: {arvostelu.julkaisuvuosi}</Typography>
                                <Typography>Genre: {arvostelu.genre}</Typography>
                                <Rating value={arvostelu.tahdet} readOnly size="small" />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Haku;