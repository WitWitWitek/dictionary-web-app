type Props = {
  errorMessage: string;
};

export default function SearchError({ errorMessage }: Props) {
  return (
    <div className="search-form__error">
      <img className="search-form__error-image" src="/not-found-cover.png" alt="Cover for bad query" />
      <h2 className="search-form__error-heading">No definition found</h2>
      <p className="search-form__error-message">{errorMessage}</p>
    </div>
  );
}
