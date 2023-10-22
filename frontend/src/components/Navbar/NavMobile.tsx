import { BsFillPersonFill } from 'react-icons/bs';
import NavMenu from './NavMenu';

type Props = {
  isMenuVisible: boolean;
  setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavMobile({ isMenuVisible, setIsMenuVisible }: Props) {
  const toggleIsMenuVisible = () => setIsMenuVisible((prev) => !prev);
  return (
    <div className="navbar__mobile">
      <button className="navbar__mobile-burger" type="button" onClick={toggleIsMenuVisible}>
        <BsFillPersonFill />
      </button>
      {isMenuVisible && <NavMenu setIsMenuVisible={setIsMenuVisible} />}
    </div>
  );
}
