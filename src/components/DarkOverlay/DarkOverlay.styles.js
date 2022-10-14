import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { setLightsOff } from '../../helpers/utils';

export const DarkOverlayContainer = styled.div`
  position: fixed;
  z-index: 50;
  background: rgba(0, 0, 0, 0.8);
  max-width: 820px;
  margin: 0px auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => setLightsOff('none', props.lightsOffMode)};
`;
