import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, selectIsAuth, selectAuthError, selectAuthStatus } from '../slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuth || localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(login({ username, password }));
    if (login.fulfilled.match(action)) navigate('/', { replace: true });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <h1 className="h4 mb-4 text-center">Вход</h1>

          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={status === 'loading'}
                isInvalid={Boolean(error)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={status === 'loading'}
                isInvalid={Boolean(error)}
              />
              <Form.Control.Feedback type="invalid">
                {error || 'Ошибка авторизации'}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Вход...' : 'Войти'}
              </Button>
            </div>
          </Form>

          <div className="text-muted mt-3 small">
            Для проверки: <code>username: admin</code>, <code>password: admin</code>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
