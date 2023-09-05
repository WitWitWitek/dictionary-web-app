import { FaUser, FaLock, FaRegEnvelope, FaRegEdit } from 'react-icons/fa';
import { AuthInputType } from '@/types';

type Props = {
  inputType: string | undefined;
};

export default function InputIcon({ inputType }: Props) {
  let content;
  switch (inputType) {
    case AuthInputType.username:
      content = <FaUser />;
      break;
    case AuthInputType.password:
      content = <FaLock />;
      break;
    case AuthInputType.email:
      content = <FaRegEnvelope />;
      break;
    default:
      content = <FaRegEdit />;
  }
  return <span className="form__input-icon">{content}</span>;
}
