/* eslint-disable react/no-unstable-nested-components */
import { Accordion, Card } from 'react-bootstrap';
import React, { Children, useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import {
  AccordionHeaderTitle,
  AccordionIcon,
  StyledAccordion,
  CardBody,
  CardHeader,
  AccordionHeaderContainer,
  AccordionHeaderRightWrapper,
} from './FAQsAccordion.styles';

const FAQsAccordion = (props) => {
  const { children, titles } = props;

  const AccordionHeader = ({ eventKey, title }) => {
    const currentEventKey = useContext(AccordionContext);

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <CardHeader isActive={isCurrentEventKey}>
        <AccordionHeaderContainer>
          <AccordionHeaderTitle>{title}</AccordionHeaderTitle>

          <AccordionHeaderRightWrapper>
            <AccordionIcon
              isActive={isCurrentEventKey}
              className={`fas fa-chevron-${
                isCurrentEventKey ? 'up' : 'down'
              } fa-lg`}
            />
          </AccordionHeaderRightWrapper>
        </AccordionHeaderContainer>
      </CardHeader>
    );
  };

  return (
    <StyledAccordion>
      {Children?.map(children, (child, index) => (
        <Card key={index}>
          <AccordionHeader eventKey={`${index + 1}`} title={titles[index]} />
          <Accordion.Collapse eventKey={`${index + 1}`}>
            <CardBody>{child}</CardBody>
          </Accordion.Collapse>
        </Card>
      ))}
    </StyledAccordion>
  );
};

export default FAQsAccordion;
