import { useFormik } from 'formik';
import { useChangePasswordMutation } from './userApiSlice';
import { UpdatePasswordFormInterface } from '@/types';
import AuthInput from '@/components/ui/AuthInput';
import updatePasswordValidation from './updatePasswordValidation';

export default function UpdatePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik<UpdatePasswordFormInterface>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: updatePasswordValidation,
    onSubmit: async (args, actions) => {
      await changePassword({ password: args.password, newPassword: args.newPassword });
      actions.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit} className="form sign-up-form">
      <label htmlFor="password">
        <p>Current Password:</p>
        <AuthInput
          id="password"
          name="password"
          type="password"
          placeholder="Enter your current password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && touched.password ? 'input-error' : ''}
          autoComplete="off"
          disabled={isLoading}
        />
        {errors.password && touched.password && <div className="form__input-error-info">{errors.password}</div>}
      </label>

      <label htmlFor="newPassword">
        <p>New Password:</p>
        <AuthInput
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          className={errors.newPassword && touched.newPassword ? 'input-error' : ''}
          autoComplete="off"
          disabled={isLoading}
        />
        {errors.newPassword && touched.newPassword && (
          <div className="form__input-error-info">{errors.newPassword}</div>
        )}
      </label>

      <label htmlFor="confirmNewPassword">
        <p>New Password Confirmation:</p>
        <AuthInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          placeholder="Confirm your new password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmNewPassword}
          className={errors.confirmNewPassword && touched.confirmNewPassword ? 'input-error' : ''}
          autoComplete="off"
          disabled={isLoading}
        />
        {errors.confirmNewPassword && touched.confirmNewPassword && (
          <div className="form__input-error-info">{errors.confirmNewPassword}</div>
        )}
      </label>

      <button disabled={isLoading} type="submit" className="form__submit-btn">
        {!isLoading ? 'Update password' : 'Loading...'}
      </button>
    </form>
  );
}
