import { BsFillPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import NavMenu from './NavMenu';

export default function NavMobile() {
  const [isMenuVisivle, setIsMenuVisible] = useState<boolean>(false);
  const toggleIsMenuVisible = () => setIsMenuVisible((prev) => !prev);
  return (
    <div className="navbar__mobile">
      <button className="navbar__mobile-burger" type="button" onClick={toggleIsMenuVisible}>
        <BsFillPersonFill />
      </button>
      {isMenuVisivle && <NavMenu toggleIsMenuVisible={toggleIsMenuVisible} />}
    </div>
  );
}
