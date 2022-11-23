import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { recoverPassword } from '../../store/actions/auth';
import {
  Page,
  Container,
  Box,
  Text,
  InputLabel,
} from './RecoverPasswordScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import { colors } from '../../constants/colors';
import MaterialLoop from '../../assets/icons/material-loop.svg';
import TopBar from '../../components/TopBar/TopBar';
import CustomInput from '../../components/CustomInput/CustomInput';
import { validateEmail } from '../RegisterScreen/validate';

const initialValues = {
  email: '',
};

const RecoverPasswordScreen = (props) => {
  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [notReadySubmit, setNotReadySubmit] = useState(true);

  const recoverPasswordHandler = useCallback(() => {
    dispatch(recoverPassword(formData.email))
      .then(history.push(routes.LOGIN.path))
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, formData.email, history, routes]);

  useEffect(() => {
    if (validateEmail(formData.email, false) === null) {
      setNotReadySubmit(false);
    } else {
      setNotReadySubmit(true);
    }
  }, [formData.email]);

  //  Validates the fields
  const validate = (values, lastErrors) => {
    const errors = { ...lastErrors };
    const error = validateEmail(values.email, false);
    delete errors.email;
    if (error !== null) {
      errors.email = error;
    }
    return errors;
  };

  //  Click Handlers
  const clickHandler = () => {
    setFormErrors((prevErrors) => validate(formData, prevErrors));
    if (Object.keys(formErrors).length === 0) {
      recoverPasswordHandler();
    }
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backClickHandler = () => {
    history.goBack();
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        backTarget={() => backClickHandler()}
        aligned
        hasBackButton
        hasLogo
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
      />
      <Container>
        <div className="fullDiv">
          <Text fontSize={fontSize} font={font}>
            {t('recover_password')}
          </Text>
          <InputLabel fontSize={fontSize} font={font}>
            {t('email')}
            <span>*</span>
          </InputLabel>
          <CustomInput
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('email_placeholder')}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <CustomButton
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: '100%',
            borderRadius: '25px',
          }}
          disabled={notReadySubmit}
          backgroundColor={notReadySubmit ? colors.grey : colors.orange}
          text={t('recover')}
          icon={MaterialLoop}
          onClick={() => clickHandler()}
        />
        <Box>
          <CustomButton
            style={{
              width: 'auto',
              color: colors.primaryColor,
              boxShadow: 'none',
            }}
            backgroundColor={colors.transparent}
            text={t('create_account')}
            onClick={() => history.push(routes.REGISTER.path)}
          />
          <CustomButton
            style={{
              width: 'auto',
              color: colors.primaryColor,
              boxShadow: 'none',
            }}
            backgroundColor={colors.transparent}
            text={t('login')}
            onClick={() => history.push(routes.LOGIN.path)}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default withRouter(RecoverPasswordScreen);
