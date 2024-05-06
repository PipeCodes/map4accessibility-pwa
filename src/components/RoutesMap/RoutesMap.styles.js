import styled from 'styled-components';
import { updateValue } from '../../helpers/utils';

export const Container = styled.div`
  .gmnoprint {
    ul {
      display: none;
    }
  }
`;

export const Routes = styled.div`
  background-color: ${(props) => updateValue('white', props.backgroundColor)};
  align-items: center;
  padding-left: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-directions: row;
  gap: 15px;
  overflow-x: auto;
  overflow-y: clip;
  border-radius: 14px 14px 0 0;
  padding-bottom: 100px;
`;
