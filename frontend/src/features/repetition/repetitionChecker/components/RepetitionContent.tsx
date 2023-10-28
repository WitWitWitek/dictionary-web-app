type Props = {
  currentRepetition: string;
};

export default function RepetitionContent({ currentRepetition }: Props) {
  return (
    <div className="repetition-checker__content">
      <h3 className="repetition-checker__title">Repetition content:</h3>
      <div className="repetition-checker__content-wrapper">{currentRepetition}</div>
    </div>
  );
}
