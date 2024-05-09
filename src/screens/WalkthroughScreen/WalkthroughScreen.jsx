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
    if (currentStep === 7) {
      Cookies.set('tutorial', 'accepted');
      history.replace(routes.MAP.path);
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
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_1_title')}</span>
                <br />
                {t('tutorial_1')}
              </Text>
            </>
          )}
          {currentStep === 1 && (
            <>
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_2_title')}</span>
                <br />
                {t('tutorial_2')}
              </Text>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_3_title')}</span>
                <br />
                {t('tutorial_3')}
              </Text>
            </>
          )}
          {currentStep === 3 && (
            <>
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_4_title')}</span>
                <br />
                {t('tutorial_4')}
              </Text>
            </>
          )}
          {currentStep === 4 && (
            <>
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_5_title')}</span>
                <br />
                {t('tutorial_5')}
              </Text>
            </>
          )}
          {currentStep === 5 && (
            <>
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_6_title')}</span>
                <br />
                {t('tutorial_6')}
              </Text>
            </>
          )}
          {currentStep === 6 && (
            <>
              <Image
                src={TutorialFirst}
                alt={t('alt_text.tutorial_phone_icon')}
              />
              <Text fontSize={fontSize} font={font}>
                <span>{t('tutorial_7_title')}</span>
                <br />
                {t('tutorial_7_1')}
                <br />
                {t('tutorial_7_2')}
              </Text>
            </>
          )}
        </div>
        <PageIndicator currentStep={currentStep} total={7} />
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
