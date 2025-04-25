import { useState } from 'react';
import { Box, Paper, Typography, Button, TextField } from '@mui/material';

export const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput(prev => prev + value);
  };

  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch {
      setResult('Error');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 300, mx: 'auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Calculadora
      </Typography>
      <TextField
        fullWidth
        value={input}
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{ readOnly: true }}
      />
      <TextField
        fullWidth
        value={result}
        variant="outlined"
        sx={{ mb: 2 }}
        InputProps={{ readOnly: true }}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((item) => (
          <Button
            key={item}
            variant="contained"
            onClick={item === '=' ? calculate : () => handleButtonClick(item)}
            sx={{ p: 2 }}
          >
            {item}
          </Button>
        ))}
        <Button
          variant="contained"
          color="error"
          onClick={clear}
          sx={{ p: 2, gridColumn: 'span 4' }}
        >
          Limpiar
        </Button>
      </Box>
    </Paper>
  );
};