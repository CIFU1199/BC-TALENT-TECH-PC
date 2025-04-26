import { FormEvent, useState } from 'react';
import { Form, Button, Card, Container, Alert, Stack, Row, Col } from 'react-bootstrap';
import { PersonFill, CardText, Save, ArrowLeft } from 'react-bootstrap-icons';
import { UserDatos } from '../types/types';

export const RegisterForm = () => {
  const [formData, setFormData] = useState<UserDatos>({
    nombre: '',
    apellido: '',
    documento: ''
  });
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<UserDatos>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDatos> = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'Apellido es requerido';
    if (!formData.documento.trim()) {
      newErrors.documento = 'Documento es requerido';
    } else if (!/^\d+$/.test(formData.documento)) {
      newErrors.documento = 'Solo se permiten números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    if (form.checkValidity() === false || !validateForm()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    localStorage.setItem('userData', JSON.stringify(formData));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (field: keyof UserDatos, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <Stack direction="horizontal" gap={2}>
                <PersonFill size={20} />
                <span className="fw-bold">Registro de Usuario</span>
              </Stack>
            </Card.Header>
            
            <Card.Body>
              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  ¡Datos guardados exitosamente!
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label><strong>Nombre</strong></Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    required
                    isInvalid={!!errors.nombre}
                    placeholder="Ingrese su nombre"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label><strong>Apellido</strong></Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => handleChange('apellido', e.target.value)}
                    required
                    isInvalid={!!errors.apellido}
                    placeholder="Ingrese su apellido"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.apellido}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label><strong>Documento de Identidad</strong></Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.documento}
                    onChange={(e) => handleChange('documento', e.target.value)}
                    required
                    isInvalid={!!errors.documento}
                    placeholder="Número de documento"
                  />
                  <Form.Text className="text-muted">
                    Solo números, sin puntos ni guiones
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.documento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Stack direction="horizontal" gap={3} className="justify-content-end">
                  <Button variant="outline-secondary" size="lg">
                    <ArrowLeft className="me-2" />
                    Cancelar
                  </Button>
                  <Button variant="primary" type="submit" size="lg">
                    <Save className="me-2" />
                    Guardar Datos
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};