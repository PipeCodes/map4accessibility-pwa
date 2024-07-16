import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
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
import { Text } from './RegisterScreen.styles';
import { DISABILITIES } from '../../constants/disabilityTypes';

const ExtraStep = (props) => {
  const { formData, setFormData } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  const activeButton = {
    width: '100%',
    borderRadius: '25px',
    border: '1px solid #34518d',
    color: colors.white,
    boxShadow: 'none',
    marginTop: '30px',
    backgroundColor: colors.primaryColor,
  };

  const inactiveButton = {
    width: '100%',
    borderRadius: '25px',
    border: '1px solid #34518d',
    color: colors.primaryColor,
    boxShadow: 'none',
    marginTop: '30px',
  };

  useEffect(() => {
    if (
      formData?.motorDisability ||
      formData?.visualDisability ||
      formData?.hearingDisability ||
      formData?.intellectualDisability
    ) {
      if (formData.noDisability !== false) {
        setFormData((prev) => ({
          ...prev,
          noDisability: false,
        }));
      }
    } else if (formData.noDisability !== true) {
      setFormData((prev) => ({
        ...prev,
        noDisability: true,
      }));
    }
  }, [
    formData?.motorDisability,
    formData?.visualDisability,
    formData?.hearingDisability,
    formData?.intellectualDisability,
    formData?.noDisability,
    setFormData,
  ]);

  const disabilityClickHandler = useCallback(
    (disabilityOpt) => {
      switch (disabilityOpt) {
        case DISABILITIES?.NO_DISABILITY:
          setFormData((prev) => ({
            ...prev,
            noDisability: true,
            motorDisability: false,
            visualDisability: false,
            hearingDisability: false,
            intellectualDisability: false,
          }));
          break;
        case DISABILITIES?.MOTOR:
          setFormData((prev) => ({
            ...prev,
            motorDisability: !prev.motorDisability,
          }));
          break;
        case DISABILITIES?.VISUAL:
          setFormData((prev) => ({
            ...prev,
            visualDisability: !prev.visualDisability,
          }));
          break;
        case DISABILITIES?.HEARING:
          setFormData((prev) => ({
            ...prev,
            hearingDisability: !prev.hearingDisability,
          }));
          break;
        case DISABILITIES?.INTELLECTUAL:
          setFormData((prev) => ({
            ...prev,
            intellectualDisability: !prev.intellectualDisability,
          }));
          break;

        default:
          break;
      }
    },
    [setFormData],
  );

  return (
    <div className="fullDiv">
      <Text fontSize={fontSize} font={font}>
        {t('disability_profile')}
        <span>{t('optional')}</span>
      </Text>
      <CustomButton
        style={formData.noDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('no_disability')}
        icon={formData.noDisability ? NoDisabilityActiveIcon : NoDisabilityIcon}
        onClick={() => disabilityClickHandler(DISABILITIES?.NO_DISABILITY)}
      />
      <CustomButton
        style={formData.motorDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('motor_disability')}
        icon={formData.motorDisability ? MotorActiveIcon : MotorIcon}
        onClick={() => disabilityClickHandler(DISABILITIES?.MOTOR)}
      />
      <CustomButton
        style={formData.visualDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('visual_disability')}
        icon={formData.visualDisability ? VisualActiveIcon : VisualIcon}
        onClick={() => disabilityClickHandler(DISABILITIES?.VISUAL)}
      />
      <CustomButton
        style={formData.hearingDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('hearing_disability')}
        icon={formData.hearingDisability ? HearingActiveIcon : HearingIcon}
        onClick={() => disabilityClickHandler(DISABILITIES?.HEARING)}
      />
      <CustomButton
        style={formData.intellectualDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('intellectual_disability')}
        icon={
          formData.intellectualDisability
            ? IntellectualActiveIcon
            : IntellectualIcon
        }
        onClick={() => disabilityClickHandler(DISABILITIES?.INTELLECTUAL)}
      />
    </div>
  );
};

export default ExtraStep;
