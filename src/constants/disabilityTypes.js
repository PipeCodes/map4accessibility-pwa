import NoDisabilityIcon from '../assets/icons/disabilities/no-disability.svg';
import MotorIcon from '../assets/icons/disabilities/motor-disability.svg';
import VisualIcon from '../assets/icons/disabilities/visual-disability.svg';
import HearingIcon from '../assets/icons/disabilities/hearing-disability.svg';
import IntellectualIcon from '../assets/icons/disabilities/intellectual-disability.svg';

export const disabilityTypes = [
  {
    id: 1,
    label: 'No Disability',
    type: null,
    icon: NoDisabilityIcon,
  },
  {
    id: 2,
    label: 'Motor Disability',
    type: 'motor',
    icon: MotorIcon,
  },
  {
    id: 3,
    label: 'Visual Disability',
    type: 'visual',
    icon: VisualIcon,
  },
  {
    id: 4,
    label: 'Hearing Disability',
    type: 'hearing',
    icon: HearingIcon,
  },
  {
    id: 5,
    label: 'Intellectual Disability',
    type: 'intellectual',
    icon: IntellectualIcon,
  },
];
