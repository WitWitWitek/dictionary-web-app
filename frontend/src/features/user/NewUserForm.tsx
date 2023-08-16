import { useFormik } from 'formik';
import { useCreateNewUserMutation } from './userApiSlice';
import newUserValidation from './newUserFormValidation';

interface NewUserFormInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function NewUserForm() {
  const [createNewUser, { isSuccess, isLoading, isError }] = useCreateNewUserMutation();

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
        Username:
        <input
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
        {errors.username && touched.username && <p>{errors.username}</p>}
      </label>
      <label htmlFor="email">
        Email Address:
        <input
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
        {errors.email && touched.email && <p>{errors.email}</p>}
      </label>
      <label htmlFor="password">
        Password:
        <input
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
        {errors.password && touched.password && <p>{errors.password}</p>}
      </label>
      <label htmlFor="password">
        Password Confirmation:
        <input
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
        {errors.confirmPassword && touched.confirmPassword && <p>{errors.confirmPassword}</p>}
      </label>

      <button disabled={isLoading} type="submit">
        {!isLoading ? 'Submit' : '...'}
      </button>
      {isSuccess && <p>User successfully registered.</p>}
      {isError && <p>Error occured...</p>}
    </form>
  );
}
