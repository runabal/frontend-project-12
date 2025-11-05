import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logout());

  return (
    <div className="p-3">
      <h2>Чат (приватная страница)</h2>
      <p>Если вы это видите — токен есть в localStorage.</p>
      <Button variant="outline-secondary" onClick={onLogout}>Выйти</Button>
    </div>
  );
};

export default ChatPage;
