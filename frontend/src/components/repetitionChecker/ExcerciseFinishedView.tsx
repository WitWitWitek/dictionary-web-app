import { Link } from 'react-router-dom';

export default function ExcerciseFinishedView() {
  return (
    <div>
      <p>&#9745;</p>
      <h2>Well done!</h2>
      <p>
        Keep challenging yourself, and you&apos;ll continue to make impressive strides on your language learning
        journey.
      </p>
      <p>
        <Link to="/dictionary">Go to dictionary</Link> and find new interesting stuff.
      </p>
    </div>
  );
}
