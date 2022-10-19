import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup } from '../../store/actions/auth';
import { Page, Container, Box, TextSecondary } from './RegisterScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import LoginIcon from '../../assets/icons/login.svg';
import { colors } from '../../constants/colors';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import TopBar from '../../components/TopBar/TopBar';
import SignUpInfo from './SignUpInfo';
import ExtraStep from './ExtraStep';

const PageDisplay = (formData, setFormData, page, formErrors) => {
  if (page === 0) {
    return (
      <SignUpInfo
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
      />
    );
  }
  return <ExtraStep formData={formData} setFormData={setFormData} />;
};

const RegisterScreen = (props) => {
  const initialValues = {
    firstName: '',
    surname: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    noDisability: false,
    motorDisability: false,
    visualDisability: false,
    hearingDisability: false,
    intellectualDisability: false,
  };

  const { history, routes } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  function changePage(value) {
    setPage((currPage) => currPage + value);
  }

  // Validates the fields
  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const regexDate = /^[0-9]{1,4}[-,/][0-9]{1,2}[-,/][0-9]{1,4}$/;

    if (!values.firstName) {
      errors.firstName = t('required_firstName');
    } else if (typeof values.firstName !== 'string') {
      errors.firstName = t('string_firstName');
    }

    if (!values.surname) {
      errors.surname = t('required_surname');
    } else if (typeof values.surname !== 'string') {
      errors.surname = t('string_firstName');
    }

    if (!values.birthDate) {
      errors.birthDate = t('required_birthDate');
    } else if (!regexDate.test(values.birthDate)) {
      console.log(values.birthDate);
      errors.birthDate = t('invalid_birthDate');
    }

    if (!values.email) {
      errors.email = t('required_email');
    } else if (!regexEmail.test(values.email)) {
      errors.email = t('invalid_email');
    }

    if (!values.password) {
      errors.password = t('required_password');
    } else if (values.password !== values.confirmPassword) {
      errors.password = t('passwords_match');
    } else if (!regexPassword.test(values.password)) {
      errors.password = t('password_rules');
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = t('required_confirmPassword');
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = t('passwords_match');
    }

    return errors;
  };

  // ClickHandlers
  const registerClickHandler = useCallback(() => {
    const disabilities = [];
    if (formData.motorDisability) {
      disabilities.push('motor');
    } else if (formData.visualDisability) {
      disabilities.push('visual');
    } else if (formData.hearingDisability) {
      disabilities.push('hearing');
    } else if (formData.intellectualDisability) {
      disabilities.push('intellectual');
    }

    dispatch(
      signup(
        formData.firstName,
        formData.surname,
        formData.birthDate,
        formData.email,
        formData.password,
        disabilities,
      ),
    ).catch((error) => {
      alert(error);
    });
  }, [dispatch, formData]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backClickHandler = (page) => {
    if (page === 0) {
      history.goBack();
    }
    changePage(-1);
  };

  const nextClickHandler = (page, formErrors) => {
    if (page === 0) {
      setFormErrors(validate(formData));
      if (Object.keys(validate(formData)).length === 0) {
        changePage(1);
        return;
      }
      return;
    }
    if (Object.keys(formErrors).length === 0) {
      registerClickHandler();
    } else {
      setPage(0);
    }
  };

  return (
    <Page>
      <TopBar
        backTarget={() => backClickHandler(page)}
        aligned
        hasBackButton
        hasLogo
        hasAccessibilityButton={openAccessibility}
      />
      <Container>
        {PageDisplay(formData, setFormData, page, formErrors)}
        <CustomButton
          style={{
            marginTop: 30,
            marginBottom: 20,
            width: '100%',
            borderRadius: '25px',
          }}
          backgroundColor={colors.orange}
          text={page === 0 ? t('next') : t('create_account')}
          icon={page === 0 ? ArrowRight : ProfileIcon}
          onClick={() => nextClickHandler(page, formErrors)}
        />

        {page === 0 && (
          <Box>
            <TextSecondary fontSize={fontSize}>
              {t('already_have_account')}
            </TextSecondary>
            <CustomButton
              style={{
                width: 'auto',
                borderRadius: '25px',
                color: colors.primaryColor,
                boxShadow: 'none',
              }}
              backgroundColor={colors.transparent}
              text={t('login')}
              icon={LoginIcon}
              onClick={() => history.push(routes.LOGIN.path)}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default withRouter(RegisterScreen);
