import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

const updatePasswordValidation = yup.object().shape({
  password: yup.string().required('Password is required.'),
  newPassword: yup
    .string()
    .min(8)
    .max(24)
    .matches(PASSWORD_REGEX, { message: 'Please create a stronger new password.' })
    .required('New password is required.'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match.')
    .required('New password confirmation is required.'),
});

export default updatePasswordValidation;
