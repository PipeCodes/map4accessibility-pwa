import Avatar1 from '../assets/images/avatars/avatar_1.png';
import Avatar2 from '../assets/images/avatars/avatar_2.png';
import Avatar3 from '../assets/images/avatars/avatar_3.png';
import Avatar4 from '../assets/images/avatars/avatar_4.png';
import Avatar5 from '../assets/images/avatars/avatar_5.png';
import Avatar6 from '../assets/images/avatars/avatar_6.png';

import regions from './regions.json';

export { regions };

export const AVATARS = [
  {
    id: 'avatar_1',
    element: Avatar1,
  },
  {
    id: 'avatar_2',
    element: Avatar2,
  },
  {
    id: 'avatar_3',
    element: Avatar3,
  },
  {
    id: 'avatar_4',
    element: Avatar4,
  },
  {
    id: 'avatar_5',
    element: Avatar5,
  },
  {
    id: 'avatar_6',
    element: Avatar6,
  },
];

// GENERAL STATUSES
export const SUCCESS = 'success';
export const ERROR = 'error';

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
