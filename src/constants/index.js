import FlagPortugal from '../assets/icons/flags/portugal.svg';
import FlagBelgium from '../assets/icons/flags/belgium.svg';
import FlagGermany from '../assets/icons/flags/germany.svg';
import FlagUnitedKingdom from '../assets/icons/flags/united-kingdom.svg';
import FlagUnitedStates from '../assets/icons/flags/united-states.svg';
import PlaceholderIcon from '../assets/icons/avatar_1.png';

const resultsArray = [
  {
    id: '1',
    image: PlaceholderIcon,
    name: 'Green City Park',
    city: 'Lisboa',
    likes: 321,
  },
  {
    id: '2',
    image: PlaceholderIcon,
    name: 'Tropic Hotel',
    city: 'Algarve',
    likes: 312,
  },
  {
    id: '3',
    image: PlaceholderIcon,
    name: 'Museum Of Fine Arts',
    city: 'Porto',
    likes: 311,
  },
  {
    id: '4',
    image: PlaceholderIcon,
    name: 'Seaview Hotel',
    city: 'Lisboa',
    likes: 231,
  },
  {
    id: '5',
    image: PlaceholderIcon,
    name: 'Contemporary Museum',
    city: 'Lisboa',
    likes: 213,
  },
  {
    id: '6',
    image: PlaceholderIcon,
    name: 'Round Table Restaurant',
    city: 'Braga',
    likes: 212,
  },
  {
    id: '7',
    image: PlaceholderIcon,
    name: 'Carlos Rogers Park',
    city: 'Lisboa',
    likes: 193,
  },
  {
    id: '8',
    image: PlaceholderIcon,
    name: 'Parque Las dunas',
    city: 'Porto',
    likes: 191,
  },
  {
    id: '9',
    image: PlaceholderIcon,
    name: 'Miradouro Ourique',
    city: 'Ourique',
    likes: 189,
  },
  {
    id: '10',
    image: PlaceholderIcon,
    name: 'AlgarvShoping',
    city: 'Faro',
    likes: 188,
  },
];

export const countries = [
  {
    id: 1,
    label: 'PT',
    icon: FlagPortugal,
  },
  {
    id: 2,
    label: 'BE',
    icon: FlagBelgium,
  },
  {
    id: 3,
    label: 'DE',
    icon: FlagGermany,
  },
  {
    id: 4,
    label: 'UK',
    icon: FlagUnitedKingdom,
  },
  {
    id: 5,
    label: 'US',
    icon: FlagUnitedStates,
  },
];

export const options = ['A', 'B', 'C', 'D', 'E']; // List for Route Keys

// GENERAL STATUSES
export const SUCCESS = 'success';
export const ERROR = 'error';

// SOCIAL LOGIN PROVIDERS
export const PROVIDER_FB = 'facebook';
export const PROVIDER_GG = 'google';

// REGEX

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*^~+=`|\\[\](){}:;'<>ç,.?/"_-]{8,}$/;
export const REGEX_DATE = /^[0-9]{1,4}[-,/][0-9]{1,2}[-,/][0-9]{1,4}$/;

// HTTP STATUS
export const HTTP_STATUS = {
  UNHAUTORIZED: 401,
  FORBIDDEN: 403,
  SUCCESS: 200,
  SUCCESS_CREATED: 201,
  SUCCESS_ACCEPTED: 202,
  ERROR: 500,
  NOT_FOUND: 404,
  CONFLICT: 409,
};
