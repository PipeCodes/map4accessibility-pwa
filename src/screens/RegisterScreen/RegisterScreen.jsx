import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signup, signupProvider } from '../../store/actions/auth';
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

const PageDisplay = ({
  formData,
  setFormData,
  page,
  formErrors,
  setFormErrors,
  validate,
  setNotReadySubmit,
  social,
}) => {
  if (page === 0) {
    return (
      <SignUpInfo
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        validate={validate}
        setNotReadySubmit={setNotReadySubmit}
        social={social}
      />
    );
  }
  return <ExtraStep formData={formData} setFormData={setFormData} />;
};

const initialValues = {
  firstName: '',
  surname: '',
  birthDate: '',
  email: '',
  password: '',
  confirmPassword: '',
  provider: '',
  termsAccepted: false,
  noDisability: false,
  motorDisability: false,
  visualDisability: false,
  hearingDisability: false,
  intellectualDisability: false,
};

const RegisterScreen = (props) => {
  const { history, routes, location } = props;
  const social = location?.state?.social;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const loading = useSelector((state) => state.auth.loading);

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [notReadySubmit, setNotReadySubmit] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && history) {
      history.replace(routes.LOGIN.path);
    }
  }, [user, history]);

  const changePage = (value) => {
    setPage((currPage) => currPage + value);
  };

  // Validates the fields
  const validate = (field, values, lastErrors, duplicatedEmail = false) => {
    const errors = { ...lastErrors };
    let error;
    switch (field) {
      case 'firstName':
        delete errors.firstName;
        error = validateFirstName(values.firstName);
        if (error !== null) {
          errors.firstName = error;
        }
        break;

      case 'surname':
        delete errors.surname;
        error = validateSurname(values.surname);
        if (error !== null) {
          errors.surname = error;
        }
        break;

      case 'birthDate':
        delete errors.birthDate;
        error = validateBirthDate(values.birthDate);
        if (error !== null) {
          errors.birthDate = error;
        }
        break;

      case 'email':
        delete errors.email;
        error = validateEmail(values.email, duplicatedEmail);
        if (error !== null) {
          errors.email = error;
        }
        break;

      case 'password':
        delete errors.password;
        error = validatePassword(values.password, values.confirmPassword);
        if (error !== null && error !== undefined) {
          errors.password = error;
        }
        break;

      case 'confirmPassword':
        delete errors.confirmPassword;
        error = validateConfirmPassword(
          values.password,
          values.confirmPassword,
        );
        if (error !== null) {
          errors.confirmPassword = error;
        }
        break;

      default:
        console.log('Field does not exist');
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
    if (social) {
      dispatch(
        signupProvider(
          formData.firstName,
          formData.surname,
          formData.birthDate,
          formData.email,
          formData.termsAccepted,
          disabilities,
          social.id,
          social.provider,
        ),
      )
        .then(() => {
          history.push(routes.REGISTER_OPTIONS.path);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      dispatch(
        signup(
          formData.firstName,
          formData.surname,
          formData.birthDate,
          formData.email,
          formData.password,
          formData.termsAccepted,
          disabilities,
        ),
      )
        .then(() => {
          history.push(routes.EMAIL_VALIDATION.path);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [dispatch, formData, history, social, routes]);

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backClickHandler = (page) => {
    if (page === 0) {
      history.goBack();
    }
    changePage(-1);
  };

  const nextClickHandler = (page) => {
    if (page === 0) {
      changePage(1);
      return;
    }
    if (page === 1) {
      registerClickHandler();
    } else {
      setPage(0);
    }
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        backTarget={() => backClickHandler(page)}
        aligned
        hasBackButton
        hasLogo
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
      />
      <Container>
        <PageDisplay
          formData={formData}
          setFormData={setFormData}
          page={page}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          validate={validate}
          setNotReadySubmit={setNotReadySubmit}
          social={social}
        />

        {page === 0 ? (
          <CustomButton
            style={{
              marginTop: 30,
              marginBottom: 20,
              width: '100%',
              borderRadius: '25px',
            }}
            disabled={notReadySubmit}
            backgroundColor={notReadySubmit ? colors.grey : colors.orange}
            text={t('next')}
            icon={ArrowRight}
            onClick={() => nextClickHandler(page)}
          />
        ) : (
          <CustomButton
            style={{
              marginTop: 30,
              marginBottom: 20,
              width: '100%',
              borderRadius: '25px',
            }}
            text={t('create_account')}
            icon={ProfileIcon}
            onClick={() => nextClickHandler(page)}
            backgroundColor={loading ? colors.grey : colors.orange}
            disabled={loading}
            loading={loading}
          />
        )}

        {page === 0 && (
          <Box>
            <TextSecondary fontSize={fontSize} font={font}>
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
