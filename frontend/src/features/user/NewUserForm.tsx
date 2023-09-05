import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useCreateNewUserMutation } from './userApiSlice';
import newUserValidation from './newUserFormValidation';
import { NewUserFormInterface } from '@/types';
import AuthInput from '@/components/ui/AuthInput';

export default function NewUserForm() {
  const [createNewUser, { isSuccess, isLoading }] = useCreateNewUserMutation();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik<NewUserFormInterface>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: newUserValidation,
    onSubmit: async (args, actions) => {
      await createNewUser({ ...args });
      actions.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit} className="form sign-up-form">
      <label htmlFor="username">
        <p>Username:</p>
        <AuthInput
          id="username"
          name="username"
          placeholder="Enter your username"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          className={errors.username && touched.username ? 'input-error' : ''}
          disabled={isLoading}
        />
        {errors.username && touched.username && <div className="form__input-error-info">{errors.username}</div>}
      </label>
      <label htmlFor="email">
        <p>Email Address:</p>
        <AuthInput
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={errors.email && touched.email ? 'input-error' : ''}
          disabled={isLoading}
        />
        {errors.email && touched.email && <div className="form__input-error-info">{errors.email}</div>}
      </label>
      <label htmlFor="password">
        <p>Password:</p>
        <AuthInput
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && touched.password ? 'input-error' : ''}
          autoComplete="off"
          disabled={isLoading}
        />
        {errors.password && touched.password && <div className="form__input-error-info">{errors.password}</div>}
      </label>
      <label htmlFor="password">
        <p>Password Confirmation:</p>
        <AuthInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
          autoComplete="off"
          disabled={isLoading}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="form__input-error-info">{errors.confirmPassword}</div>
        )}
      </label>

      <button disabled={isLoading} type="submit" className="form__submit-btn">
        {!isLoading ? 'Sign up' : 'Loading...'}
      </button>
      {isSuccess && <p>User successfully registered.</p>}
      <p className="form__paragraph">
        Already have an account? <Link to="/login">Log in.</Link>
      </p>
    </form>
  );
}
