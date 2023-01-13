import MusicIcon from '../assets/icons/places/types/music-icon.svg';
import CoffeIcon from '../assets/icons/places/types/coffee-icon.svg';
import DangerIcon from '../assets/icons/places/types/danger-icon.svg';
import GlassIcon from '../assets/icons/filters/glass-martini.svg';
import CoffeeIcon from '../assets/icons/filters/coffee.svg';

export const types = [
  {
    id: 1,
    label: 'danger',
    icon: DangerIcon,
  },

  {
    id: 2,
    label: 'attractions',
    icon: MusicIcon,
  },
  {
    id: 3,
    label: 'groceries',
    icon: CoffeIcon,
  },
];

export const filterTypes = [
  {
    id: 1,
    label: 'Restaurants',
    placeType: 'restaurant',
    icon: GlassIcon,
  },
  {
    id: 2,
    label: 'Takeout',
    placeType: 'danger',
    icon: CoffeeIcon,
  },
  {
    id: 3,
    label: 'Bars',
    placeType: 'danger',
    icon: GlassIcon,
  },
];
