import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Checkbox from 'react-custom-checkbox';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../constants/colors';
import {
  Page,
  LogoImage,
  CheckboxWrapper,
  PrivacyPolicyLabel,
  AvatarWrapper,
  Container,
} from './RegisterScreen.styles';
import Logo from '../../assets/images/old_delete/logo.svg';
import { signup } from '../../store/actions/auth';
import TopBar from '../../components/TopBar/TopBar';
import { AVATARS, regions } from '../../constants';
import AvatarCarousel from '../../components/AvatarCarousel/AvatarCarousel';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

const RegisterScreen = (props) => {
  const { routes } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState(null);
  const [privacyPolicyConditionsChecked, setPrivacyPolicyChecked] =
    useState(false);

  const registerClickHandler = () => {
    if (!privacyPolicyConditionsChecked) {
      alert(t('privacy_policy_error'));
      return;
    }
    dispatch(
      signup(
        avatar?.id ?? AVATARS[0].id,
        name,
        email,
        username,
        password,
        region?.value,
        t,
      ),
    ).catch((error) => {
      alert(error);
    });
  };

  useEffect(() => {
    if (user) {
      alert("TODO")
    }
  }, [user]);

  return (
    <Page>
      <TopBar hasBackButton />
      <Container>
        <LogoImage className="logo_img" alt="logo" src={Logo} />
        <AvatarWrapper>
          <AvatarCarousel onChange={setAvatar} />
        </AvatarWrapper>
        <CustomInput
          style={{
            marginTop: 30,
          }}
          placeholder={t('name')}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <CustomInput
          style={{
            marginTop: 13,
          }}
          placeholder={t('username')}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <CustomInput
          style={{
            marginTop: 13,
          }}
          placeholder={t('email')}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <CustomInput
          style={{
            marginTop: 13,
          }}
          placeholder={t('password')}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <CustomSelect
          style={{
            marginTop: 13,
          }}
          options={regions.map((r) => ({
            value: r.id,
            label: r.name,
          }))}
          onChange={(value) => setRegion(value)}
        />

        <CheckboxWrapper>
          <Checkbox
            checked={privacyPolicyConditionsChecked}
            onChange={setPrivacyPolicyChecked}
            borderColor={colors.blueMagenta}
            borderWidth={1}
            containerStyle={{
              backgroundColor: colors.blueMagenta,
              borderRadius: 5,
            }}
            icon={
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                }}
              />
            }
          />
          <PrivacyPolicyLabel
            onClick={() => setPrivacyPolicyChecked((prevState) => !prevState)}
            dangerouslySetInnerHTML={{
              __html: t('privacy_policy_message', {
                link: routes.POLICY.path,
                privacy_policy: t('privacy_policy'),
              }),
            }}
          />
        </CheckboxWrapper>

        <CustomButton
          style={{
            marginTop: 40,
            marginBottom: 40,
          }}
          backgroundColor={colors.orange}
          text={t('register')}
          onClick={registerClickHandler}
          disabled={loading}
        />
      </Container>
    </Page>
  );
};

export default withRouter(RegisterScreen);
