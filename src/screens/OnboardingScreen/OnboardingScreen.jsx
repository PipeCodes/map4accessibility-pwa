import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-bootstrap/Carousel';
import { withRouter } from 'react-router-dom';
import { getOnboardingItems } from '../../store/actions/onboarding';
import {
  Page,
  Container,
  SpinnerWrapper,
  Title,
  Image,
  DescriptionLabel,
  PageIndicatorContainer,
  PageIndicator,
  CarouselStyled,
  Item,
} from './OnboardingScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';

const OnboardingScreen = (props) => {
  const { history, routes } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.onboarding.items);
  const loading = useSelector((state) => state.onboarding.loading);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    dispatch(getOnboardingItems());
  }, [dispatch]);

  const continueClickHandler = () => {
    history.push(routes.LOGIN.path);
  };

  return (
    <Page>
      {loading || (!items || items.length === 0) ? (
        <SpinnerWrapper>
          <div className="spinner-border" role="status" />
        </SpinnerWrapper>
      ) : (
        <Container>
          <CarouselStyled
            indicators={false}
            controls={false}
            interval={null}
            wrap={false}
            onSelect={(eventKey) => setCurrentPageIndex(eventKey)}
          >
            {items?.map((item, index) => (
              <Carousel.Item key={`item_${index}`}>
                <Item>
                  <Title>{item.title}</Title>
                  <Image alt={item.title} src={item.icon} />
                  <DescriptionLabel
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </Item>
              </Carousel.Item>
            ))}
          </CarouselStyled>
          <PageIndicatorContainer>
            {items?.map((item, index) => (
              <PageIndicator
                key={`page_indicator_${index}`}
                active={currentPageIndex >= index}
              />
            ))}
          </PageIndicatorContainer>
          <CustomButton
            style={{
              marginBottom: 20,
            }}
            backgroundColor={colors.green}
            text={t('continue')}
            onClick={continueClickHandler}
          />
        </Container>
      )}
    </Page>
  );
};

export default withRouter(OnboardingScreen);
