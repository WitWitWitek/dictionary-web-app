import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { AuthInputType, InputComponentProps } from '@/types';
import InputIcon from './InputIcon';

export default function AuthInput({ ...props }: InputComponentProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isPasswordInputType = props.type === AuthInputType.password;

  return (
    <div className="form__auth-input">
      <InputIcon inputType={props.type} />
      {isPasswordInputType ? (
        <>
          <input {...props} type={!isPasswordVisible ? 'password' : 'text'} />
          <button className="form__auth-input-btn" type="button" onClick={() => setIsPasswordVisible((prev) => !prev)}>
            {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </>
      ) : (
        <input {...props} />
      )}
    </div>
  );
}
