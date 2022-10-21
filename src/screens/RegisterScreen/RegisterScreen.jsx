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
import {
  validateBirthDate,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validatePassword,
  validateSurname,
} from './validate';

const PageDisplay = (
  formData,
  setFormData,
  page,
  formErrors,
  setFormErrors,
  validate,
) => {
  if (page === 0) {
    return (
      <SignUpInfo
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        validate={validate}
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
  const validate = (field, values, errors) => {
    let error;

    switch (field) {
      case 'firstName':
        delete errors.firstName;
        error = validateFirstName(values.firstName);
        if (error !== null) {
          errors.firstName = t(error);
        }
        break;
      case 'surname':
        delete errors.surname;
        error = validateSurname(values.surname);
        if (error !== null) {
          errors.surname = t(error);
        }
        break;
      case 'birthDate':
        delete errors.birthDate;
        error = validateBirthDate(values.birthDate);
        if (error !== null) {
          errors.birthDate = t(error);
        }
        break;
      case 'email':
        delete errors.email;
        error = validateEmail(values.email);
        if (error !== null) {
          errors.email = t(error);
        }

        break;
      case 'password':
        delete errors.password;
        error = validatePassword(values.password, values.confirmPassword);
        if (error !== null) {
          errors.password = t(error);
        }
        break;
      case 'confirmPassword':
        delete errors.confirmPassword;
        error = validateConfirmPassword(
          values.password,
          values.confirmPassword,
        );
        if (error !== null) {
          errors.confirmPassword = t(error);
        }
        break;

      default:
        errors.firstName = t(validateFirstName(values.firstName));
        errors.surname = t(validateSurname(values.surname));
        errors.birthDate = t(validateBirthDate(values.birthDate));
        errors.email = t(validateEmail(values.email));
        errors.password = t(
          validatePassword(values.password, values.confirmPassword),
        );
        errors.confirmPassword = t(
          validateConfirmPassword(values.password, values.confirmPassword),
        );
        break;
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
      setFormErrors(validate('', formData, formErrors));
      if (Object.keys(validate('', formData, formErrors)).length === 0) {
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
        {PageDisplay(
          formData,
          setFormData,
          page,
          formErrors,
          setFormErrors,
          validate,
        )}
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
