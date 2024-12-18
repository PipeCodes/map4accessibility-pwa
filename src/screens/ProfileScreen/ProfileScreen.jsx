import moment from 'moment';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Compressor from 'compressorjs';
import i18n from '../../i18n';
import { updateProfile, getUser, logout } from '../../store/actions/auth';
import { colors } from '../../constants/colors';
import LogoutIcon from '../../assets/icons/logout.svg';
import LockIcon from '../../assets/icons/lock.svg';
import QuestionsIcon from '../../assets/icons/questions.svg';
import EditIcon from '../../assets/icons/edit.svg';
import EditActiveIcon from '../../assets/icons/edit-active.svg';
import PodiumIcon from '../../assets/icons/podium.svg';
import AvatarImg from '../../assets/images/avatarDefault.png';
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
import FooterMenu from '../../components/FooterMenu/FooterMenu';
import { IMAGE_TYPES } from '../../constants';
import { storageUrl } from '../../helpers/utils';
import { UEButtonContainer } from '../../components/UEButton/UEButton.styles';
import DialogUE from '../../components/UEButton/UEButton';

const initialValues = {
  firstName: '',
  surname: '',
  birthDate: '',
  email: '',
  disabilities: '',
  avatar: null,
};

const setUser = (user) => {
  let disabilitiesList;
  if (user.disabilities.length > 0) {
    disabilitiesList = user.disabilities.map((disability) =>
      i18n.t(disability),
    );
  }
  const disabilitiesText = disabilitiesList
    ? disabilitiesList.join(', ')
    : i18n.t('no_disabilities');

  const values = {
    firstName: user.name,
    surname: user.surname,
    birthDate: user.birthdate,
    email: user.email,
    avatar: user.avatar,
    disabilities: disabilitiesText,
  };
  return values;
};

const termsConditions = `${process.env.REACT_APP_EXTERNAL_LINKS_BASE}/terms-conditions`;

const privacyPolicy = `${process.env.REACT_APP_EXTERNAL_LINKS_BASE}/privacy-policy`;

const faqs = `${process.env.REACT_APP_EXTERNAL_LINKS_BASE}/faqs`;

const ProfileScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [editActive, setEditActive] = useState(false);

  // Gets user info on load
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Adds User data to the form with the user data
  useEffect(() => {
    if (user) {
      setFormData(setUser(user));
    }
  }, [user]);

  const readTutorial = () => {
    history.push(routes.WALKTHROUGH_TUTORIAL.path);
  };

  // Sets image source
  const getImageSource = (user, formData) => {
    if (user === null && formData === null) {
      return AvatarImg;
    }

    if (typeof formData !== 'string' && formData !== null) {
      return URL.createObjectURL(formData);
    }

    return process.env.REACT_APP_EXTERNAL_LINKS_BASE.concat(
      storageUrl(user),
    ).concat(`/${user}`);
  };

  const compressSendImage = useCallback(
    (image) => {
      // eslint-disable-next-line no-new
      new Compressor(image, {
        quality: 0.6,
        success(result) {
          dispatch(updateProfile({ ...formData, avatar: result }))
            .then(() => {
              setEditActive((prevState) => !prevState);
              dispatch(getUser());
            })
            .catch((error) => {
              // eslint-disable-next-line no-undef
              alert(error);
            });
        },
        error(err) {
          // eslint-disable-next-line no-undef
          alert(err);
        },
      });
    },
    [dispatch, formData],
  );

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
    setFormData(setUser(user));
    setEditActive((prevState) => !prevState);
  };

  const confirmEdit = useCallback(() => {
    setFormErrors(validate(formData));
    if (Object.keys(validate(formData)).length === 0) {
      return true;
    }
    return false;
  }, [formData]);

  // Makes the call to the API after confirming all fields are validated,
  // If the avatar is not a file it is changed.
  const updateProfileHandler = useCallback(() => {
    const result = confirmEdit();
    if (result) {
      if (typeof formData.avatar === 'string' || formData.avatar === null) {
        dispatch(
          updateProfile({
            firstName: formData.firstName,
            surname: formData.surname,
            birthDate: formData.birthDate,
            email: formData.email,
          }),
        )
          .then(() => {
            setEditActive((prevState) => !prevState);
            dispatch(getUser());
          })
          .catch((error) => {
            // eslint-disable-next-line no-undef
            alert(error);
          });
      } else {
        compressSendImage(formData?.avatar);
      }
    }
  }, [dispatch, formData, confirmEdit, compressSendImage]);

  const rankingHandler = () => {
    history.push(routes.RANKING.path);
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor} editActive={editActive}>
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
            <Avatar
              src={getImageSource(user?.avatar, formData?.avatar)}
              alt="avatar"
            />
            <Name font={font} fontSize={fontSize}>
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
              <InputLabel fontSize={fontSize} font={font} htmlFor="first_name">
                {t('first_name')}
              </InputLabel>
              <CustomInput
                id="first_name"
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
                maxLength="25"
              />
              {formErrors.firstName && (
                <Error fontSize={fontSize} font={font}>
                  {t(formErrors.firstName)}
                </Error>
              )}
              <InputLabel fontSize={fontSize} font={font} htmlFor="surname">
                {t('surname')}
              </InputLabel>
              <CustomInput
                id="surname"
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
                maxLength="25"
              />
              {formErrors.surname && (
                <Error fontSize={fontSize} font={font}>
                  {t(formErrors.surname)}
                </Error>
              )}
              <InputLabel fontSize={fontSize} font={font} htmlFor="avatar">
                {t('avatar')}
              </InputLabel>
              <CustomInput
                id="avatar"
                type="file"
                fontSize={fontSize}
                accept={IMAGE_TYPES}
                font={font}
                style={{}}
                placeholder={t('avatar_placeholder')}
                name="avatar"
                onChange={(e) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    avatar: e.target.files[0],
                  }));
                }}
              />
            </div>
          )}

          <InputLabel fontSize={fontSize} font={font} htmlFor="email">
            {t('email')}
          </InputLabel>
          <CustomInput
            id="email"
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('email_placeholder')}
            type="email"
            value={formData.email}
            name="email"
            readOnly
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
          />
          {formErrors.email && (
            <Error fontSize={fontSize} font={font}>
              {t(formErrors.email)}
            </Error>
          )}
          <InputLabel fontSize={fontSize} font={font} htmlFor="birth_date">
            {t('birth_date')}
          </InputLabel>
          <CustomInput
            id="birth_date"
            fontSize={fontSize}
            font={font}
            style={{ minWidth: 'intrinsic' }}
            placeholder={t('birth_date_placeholder')}
            type={editActive ? 'date' : 'text'}
            value={
              formData.birthDate ? formData.birthDate : t('birthdate_not_set')
            }
            name="birthDate"
            min={moment().subtract(100, 'years').format('YYYY-MM-DD')}
            max={moment().subtract(16, 'years').format('yyyy-MM-DD')}
            readOnly={!editActive}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                birthDate: e.target.value,
              }));
            }}
          />
          {formErrors.birthDate && (
            <Error fontSize={fontSize} font={font}>
              {t(formErrors.birthDate)}
            </Error>
          )}

          <InputLabel
            fontSize={fontSize}
            font={font}
            htmlFor="disability_types"
          >
            {t('disability_types')}
          </InputLabel>
          <CustomInput
            id="disability_types"
            fontSize={fontSize}
            font={font}
            style={{}}
            placeholder={t('disability_types')}
            type="text"
            value={formData.disabilities}
            name="disabilities"
            readOnly
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                disabilities: e.target.value,
              }));
            }}
          />

          {editActive && (
            <CustomButton
              style={{
                width: '100%',
                borderRadius: '25px',
                color: colors.white,
                margin: 'auto',
                marginTop: '10px',
              }}
              text={t('confirm')}
              onClick={() => updateProfileHandler()}
              icon={EditActiveIcon}
              backgroundColor={loading ? colors.grey : colors.primaryColor}
              loading={loading}
              disabled={loading}
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
            // eslint-disable-next-line no-undef
            onClick={() => window.open(faqs)}
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
            text={t('help')}
            icon={QuestionsIcon}
            // eslint-disable-next-line no-undef
            onClick={() => readTutorial()}
          />
          <Link
            fontSize={fontSize}
            font={font}
            href={termsConditions}
            target="_blank"
          >
            {t('terms_conditions')}
          </Link>
          <Link
            fontSize={fontSize}
            font={font}
            href={privacyPolicy}
            target="_blank"
          >
            {t('privacy_policy')}
          </Link>
        </BottomWrapper>
        <UEButtonContainer>
          <DialogUE />
        </UEButtonContainer>
      </Container>

      <FooterMenu routes={routes} profile />
    </Page>
  );
};

export default withRouter(ProfileScreen);
