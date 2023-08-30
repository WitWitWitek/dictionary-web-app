import * as yup from 'yup';

const loginValidation = yup.object().shape({
  username: yup.string().min(1).required('Required'),
  password: yup.string().min(1).required('Required'),
});

export default loginValidation;
