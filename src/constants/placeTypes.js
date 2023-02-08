import DangerIcon from '../assets/icons/places/types/danger-icon.svg';
import HospitalIcon from '../assets/icons/places/types/hospital.svg';
import CultureIcon from '../assets/icons/places/types/culture.svg';
import LodgingIcon from '../assets/icons/places/types/lodging.svg';
import PublicServiceIcon from '../assets/icons/places/types/public-service.svg';
import TransportIcon from '../assets/icons/places/types/transport.svg';
import FoodIcon from '../assets/icons/places/types/food.svg';
import DefaultIcon from '../assets/icons/places/types/default.svg';

export const types = [
  {
    id: 1,
    label: 'All',
    placeType: null,
    icon: DefaultIcon,
  },
  {
    id: 2,
    label: 'Danger',
    placeType: 'danger',
    icon: DangerIcon,
  },
  {
    id: 3,
    label: 'Restaurants',
    placeType: 'restaurant',
    icon: FoodIcon,
  },
  {
    id: 4,
    label: 'Transportation',
    placeType: 'transport',
    icon: TransportIcon,
  },
  {
    id: 5,
    label: 'Lodging',
    placeType: 'lodging',
    icon: LodgingIcon,
  },

  {
    id: 6,
    label: 'Attractions',
    placeType: 'tourist_attraction',
    icon: CultureIcon,
  },
  {
    id: 7,
    label: 'Health',
    placeType: 'health',
    icon: HospitalIcon,
  },
  {
    id: 8,
    label: 'Public Serv.',
    placeType: 'local_government_office',
    icon: PublicServiceIcon,
  },
];
