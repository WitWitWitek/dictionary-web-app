import { useFormik } from 'formik';
import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useLogoutMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';
import { LoginRequest, LoginFormInterface } from '@/types';
import loginValidation from './loginValidation';

export default function AuthForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const userToken = useSelector(selectCurrentToken);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik<LoginFormInterface>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async (args, actions) => {
      await login({ ...args });
      actions.resetForm();
      navigate('/user-repetitions');
    },
  });

  const signOutHandler = () => logout('');

  if (userToken)
    return (
      <button type="button" onClick={signOutHandler}>
        log out
      </button>
    );

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={errors.username && touched.username ? 'input-error' : ''}
        />
        {errors.username && touched.username && <p>{errors.username}</p>}
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={errors.username && touched.username ? 'input-error' : ''}
        />
        {errors.password && touched.password && <p>{errors.password}</p>}
      </label>
      <button type="submit" disabled={isLoading}>
        {!isLoading ? 'sign in' : 'loading...'}
      </button>
      <p>
        No account yet? <Link to="/sign-up">Sign up.</Link>
      </p>
    </form>
  );
}
