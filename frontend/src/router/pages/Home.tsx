import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const mainViewVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const elementOfMainView: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="home-page">
      <motion.div variants={mainViewVariants} initial="hidden" animate="visible" className="home-page__main-view">
        <motion.img
          className="home-page__main-view-image"
          variants={elementOfMainView}
          src="/home-page-cover.png"
          alt="Cover for home page"
        />
        <div className="home-page__main-view-wrapper">
          <motion.h1 variants={elementOfMainView}>
            Expand <br />
            Your Vocabulary <br />
            <span>with Ease!</span>
          </motion.h1>
          <motion.p variants={elementOfMainView}>
            Welcome to our English dictionary application. It&apos;s your gateway to a world of words and their
            meanings.
          </motion.p>
          <motion.div variants={elementOfMainView} className="home-page__main-view-container">
            <Link to="/sign-up" className="home-page__main-view-button">
              Start for free
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
