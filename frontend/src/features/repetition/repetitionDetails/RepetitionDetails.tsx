import { FaTrashCan, FaBook, FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { useFormik } from 'formik';
import { Repetition, TranslationInterface } from '@/types';
import {
  useAddTranslationToRepetitionMutation,
  useDeleteRepetitionMutation,
} from '@/features/repetition/repetitionApiSlice';
import dateHandler from '@/lib/dateHandler';
import assignMarkHandler from '@/lib/assignMarkHandler';
import translationValidation from '../translationValidation';

type Props = {
  repetition: Repetition;
};

export default function RepetitionDetails({ repetition }: Props) {
  const scoreProgress = Number(repetition.averageScore) / 5;
  const [isTranslationDisabled, setIsTranslationDisabled] = useState<boolean>(true);
  const [addTranslation] = useAddTranslationToRepetitionMutation();
  const [deleteRepetitionById] = useDeleteRepetitionMutation();

  const deleteRepetiotonHandler = async (id: string) => {
    await deleteRepetitionById({ id });
  };

  const { values, handleChange, handleSubmit, handleBlur } = useFormik<TranslationInterface>({
    initialValues: {
      translation: repetition.translation ?? '',
    },
    validationSchema: translationValidation,
    onSubmit: async (args) => {
      const translationRequestBody = { ...args, id: repetition.id };
      await addTranslation(translationRequestBody);
      setIsTranslationDisabled(() => true);
    },
  });

  return (
    <div className="repetition-details">
      <div className="repetition-details__controls">
        <button
          className="repetition-details__delete-btn"
          onClick={() => deleteRepetiotonHandler(repetition.id)}
          type="button"
          title="Remove repetition from your collection."
        >
          <FaTrashCan />
        </button>
        <Link
          className="repetition-details__dictionary-btn"
          to={`/dictionary?query=${repetition.word}`}
          title="Check word in dictionary."
        >
          <FaBook />
        </Link>
        <button
          className="repetition-details__add-translation-btn"
          onClick={() => setIsTranslationDisabled((prev) => !prev)}
          type="button"
          title="Add translation to repetition."
        >
          <FaPencil />
        </button>
      </div>
      <div className="repetition-details__container">
        <div className="repetition-details__content">{repetition.content}</div>

        <form className="repetition-details__form" onSubmit={handleSubmit}>
          <label htmlFor="translation">
            <p>Translation:</p>
            <textarea
              id="translation"
              name="translation"
              className="repetition-details__form-textarea"
              disabled={isTranslationDisabled}
              placeholder="Add translation to repetition."
              maxLength={255}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.translation}
            />
          </label>
          {!isTranslationDisabled && (
            <button type="submit" className="repetition-details__save-translation-btn" title="Save translation.">
              <FaSave />
            </button>
          )}
        </form>

        <p>
          Searched word: <span>{repetition.word}</span>
        </p>
        <p>
          Added: <span>{dateHandler(repetition.createdAt)}</span>
        </p>
        <div className="repetition-details__progress-container">
          <div className="repetition-details__progress-outer" />
        </div>
        <p>
          Last time repated:{' '}
          <span>
            {repetition.repeatedAt ? dateHandler(repetition.repeatedAt) : "The repetition hasn't been practiced yet."}
          </span>
        </p>
        <p>
          Your average score: <span>{repetition.averageScore ?? '0.00'}</span>
        </p>
        <div className="progress-bar">
          <div className="progress-bar__container">
            <div
              className={`progress-bar__line--${assignMarkHandler(scoreProgress).toLowerCase()}`}
              style={{ width: `${scoreProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
