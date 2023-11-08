import { motion, Variants } from 'framer-motion';
import { useDeleteUserMutation } from '@/features/user/userApiSlice';

type Props = {
  closeDialogFn: () => void;
};

const dialogVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DeleteUserDialog({ closeDialogFn }: Props) {
  const [deleteUser] = useDeleteUserMutation();
  const deleteUserHandler = async () => deleteUser();

  return (
    <dialog open className="dialog">
      <motion.div variants={dialogVariants} initial="hidden" animate="visible" className="dialog__container">
        <h3>Do you want to delete User?</h3>
        <div>
          <button type="button" onClick={deleteUserHandler} className="dialog__btn--delete">
            Yes
          </button>
          <button type="button" onClick={closeDialogFn} className="dialog__btn">
            No
          </button>
        </div>
      </motion.div>
    </dialog>
  );
}
