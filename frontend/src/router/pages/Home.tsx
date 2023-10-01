export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page__main-view">
        <img src="/home-page-cover.png" alt="Cover for home page" />
        <h1>
          Expand <br />
          Your Vocabulary <br />
          <span>with Ease!</span>
        </h1>
        <p>
          Welcome to our English dictionary web application, your gateway to a world of words and their captivating
          meanings.
        </p>
        <div className="home-page__main-view-container">
          <button className="home-page__main-view-button" type="button">
            Start for free
          </button>
        </div>
      </div>
    </div>
  );
}
