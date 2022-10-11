import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { colors } from '../../constants/colors';
import { Page, AvatarWrapper, Container } from './EditProfileScreen.styles';
import { getUser, updateUser } from '../../store/actions/auth';
import TopBar from '../../components/TopBar/TopBar';
import { AVATARS, regions } from '../../constants';
import AvatarCarousel from '../../components/AvatarCarousel/AvatarCarousel';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

const EditProfileScreen = (props) => {
  const { history } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);

      const avatarObj = AVATARS.find((avatar) => avatar.id === user.avatar);
      setAvatar(avatarObj);

      if (user.region) {
        setRegion({ value: user.region.id, label: user.region.name });
      }
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const saveClickHandler = () => {
    dispatch(
      updateUser(avatar?.id ?? AVATARS[0].id, name, username, region?.value, t),
    )
      .then((message) => {
        alert(message);
        history.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Page>
      <TopBar hasBackButton title={t('edit_profile')} />
      <Container>
        <AvatarWrapper>
          <AvatarCarousel defaultValue={avatar} onChange={setAvatar} />
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

        <CustomSelect
          style={{
            marginTop: 13,
          }}
          options={regions.map((r) => ({
            value: r.id,
            label: r.name,
          }))}
          value={region}
          onChange={(value) => setRegion(value)}
        />

        <CustomButton
          style={{
            marginTop: 40,
            marginBottom: 40,
          }}
          backgroundColor={colors.orange}
          text={t('save')}
          onClick={saveClickHandler}
          disabled={loading}
        />
      </Container>
    </Page>
  );
};

export default withRouter(EditProfileScreen);
