import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import {
  Page,
  Container,
  Text,
  ButtonContainer,
  Image,
} from './WalkthroughScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import TutorialFirst from '../../assets/icons/tutorial/onboarding-01.svg';
import TutorialSecond from '../../assets/icons/tutorial/onboarding-02.svg';
import TutorialThird from '../../assets/icons/tutorial/onboarding-03.svg';
import TopBar from '../../components/TopBar/TopBar';
import { STEP } from '../../constants';
import PageIndicator from '../../components/PageIndicator/PageIndicator';

const WalkthroughScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = useCallback(
    (step) => {
      switch (step) {
        case STEP.NEXT:
          setCurrentStep(currentStep + 1);
          break;
        case STEP.PREVIOUS:
          setCurrentStep(currentStep - 1);
          break;
        default:
          break;
      }
    },
    [currentStep],
  );

  useEffect(() => {
    if (currentStep === 3) {
      Cookies.set('tutorial', 'accepted');
      history.replace(routes.HOME.path);
    }
  }, [currentStep, history, routes]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
        title={t('how-it-works')}
      />
      <Container>
        <div className="fullDiv">
          {currentStep === 0 && (
            <>
              <Image src={TutorialFirst} />
              <Text fontSize={fontSize} font={font}>
                {t('lorem-ipsum')}
              </Text>
            </>
          )}
          {currentStep === 1 && (
            <>
              <Image src={TutorialSecond} />
              <Text fontSize={fontSize} font={font}>
                {t('lorem-ipsum')}
              </Text>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Image src={TutorialThird} />
              <Text fontSize={fontSize} font={font}>
                {t('lorem-ipsum')}
              </Text>
            </>
          )}
        </div>
        <PageIndicator currentStep={currentStep} total={3} />
        <ButtonContainer>
          {currentStep > 0 && (
            <CustomButton
              style={{
                borderRadius: '25px',
                color: '#707070',
                border: '1px solid #707070',
              }}
              backgroundColor={colors.transparent}
              text={t('back')}
              icon={ArrowLeft}
              onClick={() => handleNextStep(STEP.PREVIOUS)}
            />
          )}
          <CustomButton
            style={{
              borderRadius: '25px',
              border: '1px solid #efa02c',
            }}
            backgroundColor={colors.orange}
            text={t('next')}
            icon={ArrowRight}
            onClick={() => handleNextStep(STEP.NEXT)}
          />
        </ButtonContainer>
      </Container>
    </Page>
  );
};

export default withRouter(WalkthroughScreen);
