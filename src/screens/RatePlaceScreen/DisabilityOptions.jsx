import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton/CustomButton';
import NoDisabilityIcon from '../../assets/icons/disabilities/no-disability.svg';
import MotorIcon from '../../assets/icons/disabilities/motor-disability.svg';
import VisualIcon from '../../assets/icons/disabilities/visual-disability.svg';
import HearingIcon from '../../assets/icons/disabilities/hearing-disability.svg';
import IntellectualIcon from '../../assets/icons/disabilities/intellectual-disability.svg';
import NoDisabilityActiveIcon from '../../assets/icons/disabilities/no-disability-active.svg';
import MotorActiveIcon from '../../assets/icons/disabilities/motor-disability-active.svg';
import VisualActiveIcon from '../../assets/icons/disabilities/visual-disability-active.svg';
import HearingActiveIcon from '../../assets/icons/disabilities/hearing-disability-active.svg';
import IntellectualActiveIcon from '../../assets/icons/disabilities/intellectual-disability-active.svg';
import { colors } from '../../constants/colors';
import { Text } from './DisabilityOptions.styles';
import { DISABILITIES } from '../../constants/disabilityTypes';

const DisabilityOptions = ({ disabilityData, disabilityClickHandler }) => {
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const activeButton = {
    width: '100%',
    borderRadius: '25px',
    border: `1px solid ${colors.primaryColor}`,
    color: colors.white,
    boxShadow: 'none',
    marginTop: '15px',
    backgroundColor: colors.primaryColor,
  };

  const inactiveButton = {
    width: '100%',
    borderRadius: '25px',
    border: `1px solid ${colors.primaryColor}`,
    color: colors.primaryColor,
    boxShadow: 'none',
    marginTop: '15px',
  };
  return (
    <>
      <Text fontSize={fontSize} font={font}>
        {t('is_it_unaccessible')}
        <span>{t('mandatory').toLocaleLowerCase()}</span>
      </Text>
      <CustomButton
        style={disabilityData?.length === 0 ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('no_disability')}
        icon={
          disabilityData?.length === 0
            ? NoDisabilityActiveIcon
            : NoDisabilityIcon
        }
        onClick={() => disabilityClickHandler(DISABILITIES?.NO_DISABILITY)}
      />
      <CustomButton
        style={
          disabilityData?.includes(DISABILITIES?.MOTOR)
            ? activeButton
            : inactiveButton
        }
        backgroundColor={colors.transparent}
        text={t('motor_disability')}
        icon={
          disabilityData?.includes(DISABILITIES?.MOTOR)
            ? MotorActiveIcon
            : MotorIcon
        }
        onClick={() => disabilityClickHandler(DISABILITIES?.MOTOR)}
      />
      <CustomButton
        style={
          disabilityData?.includes(DISABILITIES?.VISUAL)
            ? activeButton
            : inactiveButton
        }
        backgroundColor={colors.transparent}
        text={t('visual_disability')}
        icon={
          disabilityData?.includes(DISABILITIES?.VISUAL)
            ? VisualActiveIcon
            : VisualIcon
        }
        onClick={() => disabilityClickHandler(DISABILITIES?.VISUAL)}
      />
      <CustomButton
        style={
          disabilityData?.includes(DISABILITIES?.HEARING)
            ? activeButton
            : inactiveButton
        }
        backgroundColor={colors.transparent}
        text={t('hearing_disability')}
        icon={
          disabilityData?.includes(DISABILITIES?.HEARING)
            ? HearingActiveIcon
            : HearingIcon
        }
        onClick={() => disabilityClickHandler(DISABILITIES?.HEARING)}
      />
      <CustomButton
        style={
          disabilityData?.includes(DISABILITIES?.INTELLECTUAL)
            ? activeButton
            : inactiveButton
        }
        backgroundColor={colors.transparent}
        text={t('intellectual_disability')}
        icon={
          disabilityData?.includes(DISABILITIES?.INTELLECTUAL)
            ? IntellectualActiveIcon
            : IntellectualIcon
        }
        onClick={() => disabilityClickHandler(DISABILITIES?.INTELLECTUAL)}
      />
    </>
  );
};
export default DisabilityOptions;
