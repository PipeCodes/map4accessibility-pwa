import styled from 'styled-components';
import { Card, Accordion } from 'react-bootstrap';
import { colors } from '../../constants/colors';

export const AccordionHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const AccordionHeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const AccordionHeaderRightWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 7px;
`;

export const AccordionIcon = styled.i`
  color: ${(props) => (props.isActive ? '#fff' : colors.grey)};
`;

export const StyledAccordion = styled(Accordion)`
  width: 100%;

  .card {
    margin-bottom: 20px;
    border: 0;
    border-radius: 5px !important;
  }
`;

export const CardHeader = styled(Card.Header)`
  border: 0;
  min-height: 41px;
  background-color: ${(props) => (props.isActive ? colors.green : '#fff')};
  border: 0;
  padding-bottom: 10px;
  font-family: 'Rubik-Regular';
  font-size: 16px;
  color: ${(props) => (props.isActive ? '#fff' : colors.grey)};
`;

export const CardBody = styled(Card.Body)`
  font-size: 16px;
  padding-top: 20px;
  color: ${colors.grey};
  border-radius: 0 0 5px 5px;
`;
