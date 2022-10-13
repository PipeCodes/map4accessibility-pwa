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
} from './AccessibilityScreen.styles';
import EraserIcon from '../../assets/icons/eraser.svg';
import TopBar from '../../components/TopBar/TopBar';
import {
  decreaseFontSize,
  increaseFontSize,
  resetFontSize,
} from '../../store/actions/accessibility';

const AccessibilityScreen = (props) => {
  const { routes, history } = props;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const readableFont = useSelector((state) => state.accessibilityReducer.font);

  return (
    <Page>
      <TopBar hasCloseButton hasIcon title={t('accessibility')} />
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
        />
      </Box>
      <BoxHalf>
        <BoxTitle>
          <Text>{t('font_size')}</Text>
          <EraserButton type="button" onClick={() => dispatch(resetFontSize())}>
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
          <Text>{t('contrast')}</Text>
          <EraserButton type="button" onClick="">
            <img src={EraserIcon} alt={t('reset')} />
          </EraserButton>
        </BoxTitle>
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '25px',
            width: '100%',
          }}
          text={t('choose_color')}
        />
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '25px',
            width: '100%',
            marginTop: '30px',
          }}
          text={t('underline_links')}
        />
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '25px',
            width: '100%',
            marginTop: '30px',
          }}
          text={t('highlight_links')}
        />
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '25px',
            width: '100%',
            marginTop: '30px',
          }}
          text={t('remove_animations')}
        />
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '25px',
            width: '100%',
            marginTop: '30px',
          }}
          text={t('remove_styles')}
        />
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            border: '1px solid white',
            borderRadius: '25px',
            width: '100%',
            marginTop: '30px',
          }}
          text={t('lights_off_mode')}
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
        />
      </Box>
    </Page>
  );
};

export default withRouter(AccessibilityScreen);
