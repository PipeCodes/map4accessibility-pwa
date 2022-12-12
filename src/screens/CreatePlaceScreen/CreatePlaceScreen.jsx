import React, { useEffect, useState, useCallback, useRef } from 'react';
import Compressor from 'compressorjs';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { colors } from '../../constants/colors';
import {
  Page,
  Container,
  TextWrapper,
  Text,
  Name,
  City,
  Label,
  Form,
  ButtonContainer,
  Title,
  MediaLabel,
  Error,
} from './CreatePlace.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import paperclipIcon from '../../assets/icons/paperclip.svg';
import CustomButton from '../../components/CustomButton/CustomButton';
import {} from '../../store/actions/places';

const RatePlaceScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const inputRef = useRef(null);
  const [img, setImg] = useState();
  const [error, setError] = useState('');

  // Open file input on button click
  // Reference: https://bobbyhadz.com/blog/react-open-file-input-on-button-click
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event.target.value = null;
    setImg(fileObj);
  };

  const CompressSendImage = (image, id) => {
    // eslint-disable-next-line no-new
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        dispatch(postPlaceMedia(result, id))
          .then(() => {
            history.push(routes.MAP.path);
          })
          .catch((err) => {
            alert(err);
          });
      },
      error(err) {
        alert(err.message);
      },
    });
  };

  const onSubmit = () => {
    if (false) {
      setError(t('rate_error'));
    } else {
      dispatch(postPlace())
        .then((result) => {
          if (img !== undefined) {
            CompressSendImage(img, result);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasBackButton
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('place')}
      />
      <Container>
        <Text fontSize={fontSize} font={font}>
          {t('create_place')}
        </Text>
        <Form className="questions">
          <Label fontSize={fontSize} font={font}>
            {t('name')}
          </Label>
        </Form>
        <ButtonContainer>
          <CustomButton
            style={{
              width: '100%',
              borderRadius: '3px',
              border: '1px dashed #ffffff',
            }}
            backgroundColor={colors.transparent}
            text={img === undefined ? t('Upload media files') : img.name}
            icon={paperclipIcon}
            onClick={handleClick}
          />
        </ButtonContainer>
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpg, image/jpeg, image/jpg, video/mp4, video/mp3, video/wav"
        />
        <MediaLabel fontSize={fontSize} font={font}>
          {t('supported_formats')} <span>png</span>, <span>jpeg</span>,
          <span>mp4</span>, <span>mp3</span> and <span>wav</span>.
        </MediaLabel>
        {error && (
          <Error fontSize={fontSize} font={font}>
            {error}
          </Error>
        )}
        <CustomButton
          style={{
            marginBottom: 20,
            width: '100%',
            borderRadius: '25px',
          }}
          backgroundColor={colors.orange}
          text={t('submit')}
          icon={ArrowRightIcon}
          onClick={() => onSubmit()}
        />
      </Container>
    </Page>
  );
};

export default withRouter(RatePlaceScreen);
