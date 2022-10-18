import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup } from '../../store/actions/auth';
import {
  Page,
  Container,
  Box,
  TextSecondary,
  BackButton,
} from './RegisterScreen.styles';
import CustomButton from '../../components/CustomButton/CustomButton';
import LoginIcon from '../../assets/icons/login.svg';
import { colors } from '../../constants/colors';
import ArrowBack from '../../assets/icons/arrow-back.svg';
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

    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }

    if (!values.surname) {
      errors.surname = 'Surname is required';
    }

    if (!values.birthDate) {
      errors.birthDate = 'Birth Date is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regexEmail.test(values.email)) {
      errors.email = 'Invalid Email';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.password = 'Passwords do not match';
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        'Password must have: 8 characters, 1 letter and 1 number';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Password Confirmation is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  // ClickHandlers
  const registerClickHandler = useCallback(() => {
    const disabilities = [
      formData.noDisability,
      formData.motorDisability,
      formData.visualDisability,
      formData.hearingDisability,
      formData.intellectualDisability,
    ];

    dispatch(
      signup(
        formData.firstName,
        formData.surname,
        formData.birthDate,
        formData.email,
        formData.password,
        disabilities.join(','),
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
      <TopBar hasLogo hasAccessibilityButton={openAccessibility} />
      <Container>
        <BackButton fontSize={fontSize} onClick={() => backClickHandler(page)}>
          <img src={ArrowBack} alt="Back" />
          <span>{t('Back')}</span>
        </BackButton>
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
