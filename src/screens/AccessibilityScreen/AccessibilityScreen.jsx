import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  Page,
  Box,
  BoxHalf,
  BoxTitle,
  Text,
  EraserButton,
  Container,
} from './AccessibilityScreen.styles';
import EraserIcon from '../../assets/icons/eraser.svg';
import TopBar from '../../components/TopBar/TopBar';
import {
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
  setFont,
  setUnderline,
  setHighlight,
  setLightsOff,
  resetContrast,
  resetSettings,
  toggleColors,
  removeAnimations,
} from '../../store/actions/accessibility';
import ColorsPallet from '../../components/ColorsPallet/ColorsPallet';
import { UEButtonContainer } from '../../components/UEButton/UEButton.styles';
import UEButton from '../../components/UEButton/UEButton';

const AccessibilityScreen = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const readableFont = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const underline = useSelector((state) => state.accessibility.underline);
  const highlight = useSelector((state) => state.accessibility.highlight);
  const lightsOffMode = useSelector(
    (state) => state.accessibility.lightsOffMode,
  );
  const animations = useSelector((state) => state.accessibility.animations);
  const toggleColor = useSelector((state) => state.accessibility.toggleColors);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        accessibility
        hasCloseButton
        hasIcon
        backgroundColor={backgroundColor}
        title={t('accessibility')}
      />
      <Container>
        <Box>
          <CustomButton
            style={{
              backgroundColor: readableFont ? 'white' : 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              color: readableFont ? 'black' : 'white',
            }}
            text={t('readable_font')}
            onClick={() => dispatch(setFont())}
          />
        </Box>
        <BoxHalf>
          <BoxTitle>
            <Text fontSize={fontSize} font={font}>
              {t('font_size')}
            </Text>
            <EraserButton
              type="button"
              onClick={() => dispatch(resetFontSize())}
            >
              <img src={EraserIcon} alt={t('reset')} />
            </EraserButton>
          </BoxTitle>
          <CustomButton
            style={{
              backgroundColor: 'white',
              border: '1px solid white',
              borderRadius: '25px',
              width: '45%',
              color: 'black',
            }}
            text="A-"
            onClick={() => dispatch(decreaseFontSize())}
          />
          <CustomButton
            style={{
              backgroundColor: 'white',
              border: '1px solid white',
              borderRadius: '25px',
              width: '45%',
              color: 'black',
            }}
            text="A+"
            onClick={() => dispatch(increaseFontSize())}
          />
        </BoxHalf>
        <Box>
          <BoxTitle>
            <Text fontSize={fontSize} font={font}>
              {t('contrast')}
            </Text>
            <EraserButton
              type="button"
              onClick={() => dispatch(resetContrast())}
            >
              <img src={EraserIcon} alt={t('reset')} />
            </EraserButton>
          </BoxTitle>
          <CustomButton
            style={{
              backgroundColor: toggleColor ? 'white' : 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              color: toggleColor ? 'black' : 'white',
            }}
            text={t('choose_color')}
            onClick={() => dispatch(toggleColors())}
          />

          {toggleColor && <ColorsPallet />}

          <CustomButton
            style={{
              backgroundColor: underline ? 'white' : 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              marginTop: '30px',
              color: underline ? 'black' : 'white',
            }}
            text={t('underline_links')}
            onClick={() => dispatch(setUnderline())}
          />
          <CustomButton
            style={{
              backgroundColor: highlight ? 'white' : 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              marginTop: '30px',
              color: highlight ? 'black' : 'white',
            }}
            text={t('highlight_links')}
            onClick={() => dispatch(setHighlight())}
          />
          <CustomButton
            style={{
              backgroundColor: animations ? 'white' : 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              marginTop: '30px',
              color: animations ? 'black' : 'white',
            }}
            text={t('remove_animations')}
            onClick={() => dispatch(removeAnimations())}
          />
          <CustomButton
            style={{
              backgroundColor: 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              marginTop: '30px',
              display: 'none',
            }}
            text={t('remove_styles')}
          />
          <CustomButton
            style={{
              backgroundColor: lightsOffMode ? 'white' : 'transparent',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              marginTop: '30px',
              color: lightsOffMode ? 'black' : 'white',
            }}
            text={t('lights_off_mode')}
            onClick={() => dispatch(setLightsOff())}
          />
        </Box>
        <Box>
          <CustomButton
            style={{
              backgroundColor: 'white',
              border: '1px solid white',
              borderRadius: '25px',
              width: '100%',
              color: 'black',
            }}
            text={t('back_to_default_view')}
            onClick={() => dispatch(resetSettings())}
          />
        </Box>
      </Container>
      <UEButtonContainer>
        <UEButton />
      </UEButtonContainer>
    </Page>
  );
};

export default withRouter(AccessibilityScreen);
