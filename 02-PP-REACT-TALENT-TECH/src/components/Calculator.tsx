import { useState } from 'react';
import { Card, Button, Form, Container, Stack } from 'react-bootstrap';
import { Backspace, Calculator as CalcIcon } from 'react-bootstrap-icons';

export const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<string>('');
  
  const handleClick = (value: string) => {
    if (value === '=') {
      try {
        const result = eval(input.replace(/×/g, '*').replace(/÷/g, '/')).toString();
        setPreviousValue(input);
        setInput(result);
      } catch {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setPreviousValue('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg" style={{ width: '320px' }}>
        <Card.Header className="bg-primary text-white">
          <Stack direction="horizontal" gap={2}>
            <CalcIcon size={20} />
            <span className="fw-bold">Calculadora</span>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Form.Control 
            type="text" 
            value={previousValue}
            readOnly 
            className="mb-1 text-muted small border-0 bg-light"
            style={{ height: '24px', fontSize: '0.8rem' }}
          />
          <Form.Control 
            type="text" 
            value={input} 
            readOnly 
            className="mb-3 text-end fs-4 fw-bold border-0"
            style={{ height: '50px' }}
          />
          
          <div className="d-grid gap-2">
            {buttons.map((row, rowIndex) => (
              <div key={rowIndex} className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {row.map((num) => (
                  <Button
                    key={num}
                    onClick={() => handleClick(num)}
                    variant={
                      num === '=' ? 'success' : 
                      num === 'C' ? 'danger' : 
                      num === '⌫' || num === '÷' || num === '×' || num === '-' || num === '+' ? 'outline-secondary' : 
                      'light'
                    }
                    size="lg"
                    className={
                      num === '=' ? 'fw-bold' : 
                      ['÷', '×', '-', '+', '⌫'].includes(num) ? 'fw-bold' : 
                      ''
                    }
                  >
                    {num === '⌫' ? <Backspace /> : num === '÷' ? '÷' : num === '×' ? '×' : num}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};