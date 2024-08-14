import { useSelector } from 'react-redux'; // Importing useSelector from Redux
import showToast from '../components/Toast/Toast';

const useToast = () => {
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const showToastWithReduxValue = (message, options = {}) => {
    showToast(message, options, fontSize, font);
  };

  return showToastWithReduxValue;
};

export default useToast;
