import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

function Virhe() {
    let { viesti } = useParams();

    return (
        <Box>
            <Typography color='error'>{viesti}</Typography>
        </Box>
    );
}

export default Virhe;