import * as yup from 'yup';

const loginValidation = yup.object().shape({
  username: yup.string().min(1).required('At least 1 character of username is required.'),
  password: yup.string().min(1).required('At least 1 character of password is required.'),
});

export default loginValidation;
