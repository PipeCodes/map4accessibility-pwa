import i18n from 'i18next';
import HospitalIcon from '../assets/icons/places/types/hospital.svg';
import CultureIcon from '../assets/icons/places/types/culture.svg';
import LodgingIcon from '../assets/icons/places/types/lodging.svg';
import PublicServiceIcon from '../assets/icons/places/types/public-service.svg';
import TransportIcon from '../assets/icons/places/types/transport.svg';
import FoodIcon from '../assets/icons/places/types/food.svg';
import DefaultIcon from '../assets/icons/places/types/default.svg';
import PedestrianIcon from '../assets/icons/places/types/pedestrians-cross.svg';
import RoadblockIcon from '../assets/icons/places/types/roadblock.svg';
import StreetWorksIcon from '../assets/icons/places/types/street-works.svg';
import TraficLightIcon from '../assets/icons/places/types/traffic-light.svg';
import StepStairsIcon from '../assets/icons/places/types/step-stairs.svg';
import ObstacleIcon from '../assets/icons/places/types/other-obstacle.svg';

export const types = [
  {
    id: 1,
    label: 'All',
    placeType: null,
    icon: DefaultIcon,
  },
  {
    id: 2,
    label: i18n.t('pedestrian_cross'),
    placeType: 'pedestrian_cross',
    icon: PedestrianIcon,
  },
  {
    id: 3,
    label: i18n.t('roadblock'),
    placeType: 'roadblock',
    icon: RoadblockIcon,
  },
  {
    id: 4,
    label: i18n.t('street_works'),
    placeType: 'street_works',
    icon: StreetWorksIcon,
  },
  {
    id: 5,
    label: i18n.t('faulty_traffic_light'),
    placeType: 'faulty_traffic_light',
    icon: TraficLightIcon,
  },
  {
    id: 6,
    label: i18n.t('step_stairs'),
    placeType: 'step_stairs',
    icon: StepStairsIcon,
  },
  {
    id: 7,
    label: i18n.t('obstacle'),
    placeType: 'obstacle',
    icon: ObstacleIcon,
  },
  {
    id: 8,
    label: i18n.t('restaurant'),
    placeType: 'restaurant',
    icon: FoodIcon,
  },
  {
    id: 9,
    label: i18n.t('transport'),
    placeType: 'transport',
    icon: TransportIcon,
  },
  {
    id: 10,
    label: i18n.t('lodging'),
    placeType: 'lodging',
    icon: LodgingIcon,
  },

  {
    id: 11,
    label: i18n.t('tourist_attraction'),
    placeType: 'tourist_attraction',
    icon: CultureIcon,
  },
  {
    id: 12,
    label: i18n.t('health'),
    placeType: 'health',
    icon: HospitalIcon,
  },
  {
    id: 13,
    label: i18n.t('local_government_office'),
    placeType: 'local_government_office',
    icon: PublicServiceIcon,
  },
];
