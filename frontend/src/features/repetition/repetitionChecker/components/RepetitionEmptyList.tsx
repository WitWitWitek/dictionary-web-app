import { Link } from 'react-router-dom';

export default function RepetitionEmptyList() {
  return (
    <div className="repetition-checker repetition-checker__empty-list">
      <img className="search-form__error-image" src="/not-found-cover.png" alt="Cover for bad query" />
      <p>The user hasn&apos;t chosen any repetition yet...</p>
      <Link to="/dictionary" className="repetition-checker__empty-list-btn">
        Find interesting sentence.
      </Link>
    </div>
  );
}
