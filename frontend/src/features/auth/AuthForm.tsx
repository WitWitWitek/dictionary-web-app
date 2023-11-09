import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLoginMutation, useLogoutMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';
import { LoginFormInterface } from '@/types';
import loginValidation from './loginValidation';
import AuthInput from '@/components/ui/AuthInput';

export default function AuthForm() {
  const [login, { isSuccess, isLoading }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const userToken = useSelector(selectCurrentToken);

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik<LoginFormInterface>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: async (args) => {
      await login({ ...args });
    },
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      navigate('/user-repetitions');
    }
  }, [isLoading, isSuccess]);

  const signOutHandler = () => logout('');

  if (userToken)
    return (
      <button type="button" onClick={signOutHandler} className="form__submit-btn">
        log out
      </button>
    );

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="username">
        <p>Username:</p>
        <AuthInput
          type="text"
          name="username"
          placeholder="Enter your username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={errors.username && touched.username ? 'input-error' : ''}
        />
        {errors.username && touched.username && <div className="form__input-error-info">{errors.username}</div>}
      </label>
      <label htmlFor="password">
        <p>Password:</p>
        <AuthInput
          name="password"
          placeholder="Enter your password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={errors.username && touched.username ? 'input-error' : ''}
        />
        {errors.password && touched.password && <div className="form__input-error-info">{errors.password}</div>}
      </label>
      <button type="submit" disabled={isLoading} className="form__submit-btn">
        {!isLoading ? 'Log in' : 'Loading...'}
      </button>
      <p className="form__paragraph">
        No account yet? <Link to="/sign-up">Sign up.</Link>
      </p>
    </form>
  );
}
