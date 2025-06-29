import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginForm =() => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSupmit={(values) => {
      console.log('Форма отправлена:', values);
    }}
  >
{() => (
  <Form>
    <div>
      <label htmlFor="username">Имя пользователя</label>
      <Field name="username" type="text" />
    </div>
    <div>
       <label htmlFor="password">Пароль</label>
       <Field name="password" type="password" />
    </div>
    <button type="submit">Войти</button>
  </Form>
  )}
</Formik>
);

export default LoginForm; 
