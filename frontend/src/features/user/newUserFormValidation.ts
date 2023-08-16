import * as yup from 'yup';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

const newUserValidation = yup.object().shape({
  username: yup
    .string()
    .matches(USER_REGEX, { message: 'Please create a correct username' })
    .min(3)
    .max(24)
    .required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(8)
    .max(24)
    .matches(PASSWORD_REGEX, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

export default newUserValidation;
