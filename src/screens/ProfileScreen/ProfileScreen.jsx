import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { colors } from '../../constants/colors';
import LogoutIcon from '../../assets/icons/logout.svg';
import LockIcon from '../../assets/icons/lock.svg';
import QuestionsIcon from '../../assets/icons/questions.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EditActiveIcon from '../../assets/icons/edit-active.svg';
import PodiumIcon from '../../assets/icons/podium.svg';
import AvatarImg from '../../assets/icons/avatar_1.png';
import {
  Page,
  Container,
  TopWrapper,
  FormWrapper,
  BottomWrapper,
  RankingButton,
  StackContainer,
  EditButton,
  InputLabel,
  Error,
  Name,
  Avatar,
  Link,
} from './ProfileScreen.styles';
import {
  validateEmail,
  validateBirthDate,
  validateFirstName,
  validateSurname,
} from '../RegisterScreen/validate';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import TopBar from '../../components/TopBar/TopBar';
import { getUser, logout } from '../../store/actions/auth';
import FooterMenu from '../../components/FooterMenu/FooterMenu';

const initialValues = {
  firstName: '',
  surname: '',
  birthDate: '',
  email: '',
};

const setUser = (user) => {
  const values = {
    firstName: user.name,
    surname: user.surname,
    birthDate: user.birthdate,
    email: user.email,
  };
  return values;
};

const ProfileScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [editActive, setEditActive] = useState(false);
  useEffect(() => {}, [editActive, formData.firstName, formData.surname]);
  useEffect(() => {
    if (user) {
      setFormData(setUser(user));
    }
  }, [user]);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  //  Validates the fields
  const validate = (values) => {
    const errors = {};
    let error;

    error = validateFirstName(values.firstName);
    if (error !== null) {
      errors.firstName = error;
    }

    error = validateSurname(values.surname);
    if (error !== null) {
      errors.firstName = error;
    }

    error = validateEmail(values.email, false);
    if (error !== null) {
      errors.email = error;
    }

    error = validateBirthDate(values.birthDate);
    if (error !== null) {
      errors.birthDate = error;
    }

    return errors;
  };

  // Click Handlers
  const editHandler = () => {
    setFormData(initialValues(user));
    setEditActive((prevState) => !prevState);
  };

  const confirmEditHandler = () => {
    setFormErrors(validate(formData));
    if (Object.keys(validate(formData)).length === 0) {
      setEditActive((prevState) => !prevState);
      console.log('CALL API');
    }
  };

  const rankingHandler = () => {
    console.log('Needs to be updated when ranking is implemented');
    history.push(routes.RANKING.path);
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page>
      <TopBar
        aligned
        page
        hasAccessibilityButton={openAccessibility}
        backgroundColor={backgroundColor}
        title={t('profile')}
      />
      <Container>
        <TopWrapper>
          <RankingButton onClick={() => rankingHandler()}>
            <img src={PodiumIcon} alt="Ranking" />
          </RankingButton>
          <StackContainer>
            <Avatar src={AvatarImg} alt="avatar" />
            <Name fontSize={fontSize}>
              {formData.firstName} {formData.surname}
            </Name>
          </StackContainer>
          <EditButton
            className={editActive ? 'active' : ''}
            onClick={() => editHandler()}
          >
            <img src={editActive ? EditActiveIcon : EditIcon} alt="Edit" />
          </EditButton>
        </TopWrapper>
        <FormWrapper>
          {editActive && (
            <div>
              <InputLabel fontSize={fontSize}>{t('first_name')}</InputLabel>
              <CustomInput
                fontSize={fontSize}
                font={font}
                style={{}}
                placeholder={t('first_name_placeholder')}
                value={formData.firstName}
                name="firstName"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }));
                }}
              />
              {formErrors.firstName && (
                <Error fontSize={fontSize}>{t(formErrors.firstName)}</Error>
              )}
              <InputLabel fontSize={fontSize}>{t('surname')}</InputLabel>
              <CustomInput
                fontSize={fontSize}
                font={font}
                style={{}}
                placeholder={t('surname_placeholder')}
                value={formData.surname}
                name="surname"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    surname: e.target.value,
                  }));
                }}
              />
              {formErrors.surname && (
                <Error fontSize={fontSize}>{t(formErrors.surname)}</Error>
              )}
            </div>
          )}

          <InputLabel fontSize={fontSize}>{t('email')}</InputLabel>
          <CustomInput
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('email_placeholder')}
            type="email"
            value={formData.email}
            name="email"
            readOnly={!editActive}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
          {formErrors.email && (
            <Error fontSize={fontSize}>{t(formErrors.email)}</Error>
          )}
          <InputLabel fontSize={fontSize}>{t('birth_date')}</InputLabel>
          <CustomInput
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('birth_date_placeholder')}
            type="date"
            value={formData.birthDate}
            name="birthDate"
            readOnly={!editActive}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                birthDate: e.target.value,
              }));
            }}
          />
          {formErrors.birthDate && (
            <Error fontSize={fontSize}>{t(formErrors.birthDate)}</Error>
          )}
          {editActive && (
            <CustomButton
              style={{
                width: '100%',
                borderRadius: '25px',
                color: colors.white,
                margin: 'auto',
                marginTop: '10px',
              }}
              backgroundColor={colors.primaryColor}
              text={t('confirm')}
              onClick={() => confirmEditHandler(formErrors, formData)}
              icon={EditActiveIcon}
            />
          )}
        </FormWrapper>
        <BottomWrapper>
          <CustomButton
            style={{
              width: 'auto',
              borderRadius: '25px',
              color: colors.primaryColor,
              boxShadow: 'none',
            }}
            backgroundColor={colors.transparent}
            text={t('change_password')}
            onClick={() => history.push(routes.RECOVER_PASSWORD.path)}
            icon={LockIcon}
          />
          <CustomButton
            style={{
              width: 'auto',
              borderRadius: '25px',
              color: colors.primaryColor,
              boxShadow: 'none',
              marginTop: '8px',
            }}
            backgroundColor={colors.transparent}
            text={t('logout')}
            onClick={() => {
              dispatch(logout());
            }}
            icon={LogoutIcon}
          />
          <CustomButton
            style={{
              width: 'auto',
              borderRadius: '25px',
              color: colors.grey,
              boxShadow: 'none',
              marginTop: '8px',
            }}
            backgroundColor={colors.transparent}
            text={t('faqs')}
            icon={QuestionsIcon}
          />
          <Link fontSize={fontSize} href="google.com">
            {t('terms_conditions')}
          </Link>
          <Link fontSize={fontSize} href="google.com">
            {t('privacy_policy')}
          </Link>
        </BottomWrapper>
      </Container>
      <FooterMenu routes={routes} profile />
    </Page>
  );
};

export default withRouter(ProfileScreen);
