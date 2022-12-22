import React from 'react';
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
        onClick={() =>
          formData.noDisability
            ? setFormData({ ...formData, noDisability: false })
            : setFormData({ ...formData, noDisability: true })
        }
      />
      <CustomButton
        style={formData.motorDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('motor_disability')}
        icon={formData.motorDisability ? MotorActiveIcon : MotorIcon}
        onClick={() =>
          formData.motorDisability
            ? setFormData({ ...formData, motorDisability: false })
            : setFormData({ ...formData, motorDisability: true })
        }
      />
      <CustomButton
        style={formData.visualDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('visual_disability')}
        icon={formData.visualDisability ? VisualActiveIcon : VisualIcon}
        onClick={() =>
          formData.visualDisability
            ? setFormData({ ...formData, visualDisability: false })
            : setFormData({ ...formData, visualDisability: true })
        }
      />
      <CustomButton
        style={formData.hearingDisability ? activeButton : inactiveButton}
        backgroundColor={colors.transparent}
        text={t('hearing_disability')}
        icon={formData.hearingDisability ? HearingActiveIcon : HearingIcon}
        onClick={() =>
          formData.hearingDisability
            ? setFormData({ ...formData, hearingDisability: false })
            : setFormData({ ...formData, hearingDisability: true })
        }
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
        onClick={() =>
          formData.intellectualDisability
            ? setFormData({ ...formData, intellectualDisability: false })
            : setFormData({ ...formData, intellectualDisability: true })
        }
      />
    </div>
  );
};

export default ExtraStep;
