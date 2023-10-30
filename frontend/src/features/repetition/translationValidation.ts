import * as yup from 'yup';

const translationValidation = yup.object().shape({
  translation: yup.string().min(1).max(255).required('Translation is required.'),
});

export default translationValidation;
