import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function ExcerciseFinishedView() {
  const { width, height } = useWindowSize();

  return (
    <div className="repetition repetition__finished">
      <img className="repetition__finished-image" src="/success-cover.png" alt="Cover for success page" />
      <h2>Well done!</h2>
      <p>
        Keep challenging yourself, and you&apos;ll continue to make impressive strides on your language learning
        journey.
      </p>
      <p>
        <Link to="/dictionary" className="repetition__finished-btn">
          Go to dictionary
        </Link>{' '}
      </p>
      <p>and find new interesting stuff.</p>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={500}
        recycle={false}
        gravity={0.03}
        tweenDuration={8000}
        wind={0.01}
      />
    </div>
  );
}
