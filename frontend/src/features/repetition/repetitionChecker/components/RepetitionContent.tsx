type Props = {
  currentRepetition: string;
};

export default function RepetitionContent({ currentRepetition }: Props) {
  return (
    <div className="repetition__content">
      <h3 className="repetition__title">Repetition content:</h3>
      <div className="repetition__content-wrapper">{currentRepetition}</div>
    </div>
  );
}
