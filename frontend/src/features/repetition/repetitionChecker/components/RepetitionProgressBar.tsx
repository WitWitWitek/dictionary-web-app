type Props = {
  currentRepetition: number;
  allRepetitions: number;
};

export default function RepetitionProgressBar({ currentRepetition, allRepetitions }: Props) {
  const excerciseProgress = (currentRepetition / allRepetitions) * 100;
  return (
    <div className="progress-bar">
      <div className="progress-bar__description">
        <p>Repeated:</p>
        <p>{`${currentRepetition}/${allRepetitions}`}</p>
      </div>
      <div className="progress-bar__container">
        <div className="progress-bar__line" style={{ width: `${excerciseProgress}%` }} />
      </div>
    </div>
  );
}
