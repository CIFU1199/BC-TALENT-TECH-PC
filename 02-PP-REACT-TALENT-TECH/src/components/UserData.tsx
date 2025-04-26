import { useEffect, useState } from 'react';
import { Card, Button, Alert, Form, Container, Stack, Badge } from 'react-bootstrap';
import { PersonFill, PencilFill, TrashFill, Check2, X } from 'react-bootstrap-icons';
import { UserDatos } from '../types/types';

export const UserData = () => {
  const [userData, setUserData] = useState<UserDatos | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState<UserDatos | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState<Partial<UserDatos>>({});

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
      setTempData(JSON.parse(data));
    }
  }, []);

  const handleDelete = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEditChange = (field: keyof UserDatos, value: string) => {
    setTempData(prev => ({ ...prev!, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDatos> = {};
    
    if (!tempData?.nombre.trim()) newErrors.nombre = 'Nombre es requerido';
    if (!tempData?.apellido.trim()) newErrors.apellido = 'Apellido es requerido';
    if (!tempData?.documento.trim()) {
      newErrors.documento = 'Documento es requerido';
    } else if (!/^\d+$/.test(tempData.documento)) {
      newErrors.documento = 'Solo se permiten números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    localStorage.setItem('userData', JSON.stringify(tempData));
    setUserData(tempData);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setTempData(userData);
    setEditMode(false);
    setErrors({});
  };

  if (!userData) {
    return (
      <Container className="py-5">
        <Alert variant="info" className="text-center">
          No hay datos de usuario registrados
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)} className="mb-4">
          Datos eliminados correctamente
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <Stack direction="horizontal" gap={2}>
            <PersonFill size={20} />
            <span className="fw-bold">Datos del Usuario</span>
            <Badge bg="light" text="dark" className="ms-auto">
              ID: {userData.documento}
            </Badge>
          </Stack>
        </Card.Header>

        <Card.Body>
          {editMode ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label><strong>Nombre</strong></Form.Label>
                <Form.Control
                  type="text"
                  value={tempData?.nombre || ''}
                  onChange={(e) => handleEditChange('nombre', e.target.value)}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><strong>Apellido</strong></Form.Label>
                <Form.Control
                  type="text"
                  value={tempData?.apellido || ''}
                  onChange={(e) => handleEditChange('apellido', e.target.value)}
                  isInvalid={!!errors.apellido}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.apellido}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label><strong>Documento</strong></Form.Label>
                <Form.Control
                  type="text"
                  value={tempData?.documento || ''}
                  onChange={(e) => handleEditChange('documento', e.target.value)}
                  isInvalid={!!errors.documento}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.documento}
                </Form.Control.Feedback>
              </Form.Group>

              <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button variant="outline-secondary" onClick={handleCancelEdit}>
                  <X className="me-1" /> Cancelar
                </Button>
                <Button variant="success" onClick={handleSave}>
                  <Check2 className="me-1" /> Guardar
                </Button>
              </Stack>
            </Form>
          ) : (
            <>
              <div className="mb-4">
                <h5 className="text-primary">{userData.nombre} {userData.apellido}</h5>
                <div className="text-muted">Documento: {userData.documento}</div>
              </div>

              <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button variant="outline-warning" onClick={() => setEditMode(true)}>
                  <PencilFill className="me-1" /> Editar
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                  <TrashFill className="me-1" /> Eliminar
                </Button>
              </Stack>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};