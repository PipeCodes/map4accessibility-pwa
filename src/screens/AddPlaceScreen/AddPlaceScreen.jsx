import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import Compressor from 'compressorjs';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { colors } from '../../constants/colors';
import { GOOGLE_MAPS_OPTIONS, MEDIA_TYPES, IMAGE_TYPES } from '../../constants';
import { types } from '../../constants/placeTypes';
import {
  Page,
  Container,
  InputLabel,
  Form,
  ButtonContainer,
  MediaLabel,
  Error,
} from './AddPlaceScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import paperclipIcon from '../../assets/icons/paperclip.svg';
import CustomButton from '../../components/CustomButton/CustomButton';
import { postPlace, postPlaceMedia } from '../../store/actions/places';
import { getCountryCity } from '../../helpers/utils';

const AddPlaceScreen = (props) => {
  const { history, routes, location } = props;
  const { state } = location;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  const loading = useSelector((state) => state.place.loading);

  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);

  const filterTypes = useMemo(() => {
    const formatted = types.map((option) => ({
      value: option.placeType,
      label: t(option.label),
      icon: option.icon,
    }));

    return [...formatted];
  }, [t]);

  // Form Fields
  const inputRef = useRef(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCoutry] = useState('');
  const [type, setType] = useState(filterTypes[0].value);
  const [file, setFile] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && state) {
      // eslint-disable-next-line no-undef
      const latlng = new google.maps.LatLng(state.lat, state.lng);
      // eslint-disable-next-line no-undef
      new google.maps.Geocoder().geocode(
        { latLng: latlng },
        (results, status) => {
          // eslint-disable-next-line no-undef
          if (status === google.maps.GeocoderStatus.OK) {
            const response = getCountryCity(results);
            setCoutry(response.country);
            setCity(response.city);
          }
        },
      );
    }
  }, [state, isLoaded]);

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
    setFile(fileObj);
  };

  const compressSendImage = (image, id) => {
    // eslint-disable-next-line no-new
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        dispatch(postPlaceMedia(result, id))
          .then(() => {
            history.push(`/rate-place/${id}/${null}`);
          })
          .catch((err) => {
            // eslint-disable-next-line no-undef
            alert(err);
          });
      },
      error(err) {
        // eslint-disable-next-line no-undef
        alert(err);
      },
    });
  };

  const sendFile = (file, id) => {
    dispatch(postPlaceMedia(file, id))
      .then(() => {
        history.push('/rate-place/'.concat(id));
      })
      .catch((err) => {
        // eslint-disable-next-line no-undef
        alert(err);
      });
  };

  const onSubmit = () => {
    if (name === '' || name === null || name.length < 3) {
      setError(t('create_error'));
    } else {
      dispatch(postPlace(name, type, city, state, country, file))
        .then((result) => {
          if (file !== undefined) {
            if (IMAGE_TYPES.includes(file?.type)) {
              compressSendImage(file, result);
            } else {
              sendFile(file, result);
            }
          } else {
            history.push('/rate-place/'.concat(result).concat('/null'), {
              newPlace: true,
            });
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-undef
          alert(err);
        });
    }
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        backTarget={history.goBack}
        aligned
        page
        hasBackButton
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('add_place')}
      />
      <Container>
        <Form className="questions">
          <InputLabel fontSize={fontSize} font={font}>
            {t('name')}
            <span>*</span>
          </InputLabel>
          <CustomInput
            fontSize={fontSize}
            font={font}
            style={{
              borderRadius: '4px',
              height: 'auto',
              minHeight: '31px',
            }}
            placeholder={t('name')}
            name="name"
            onChange={(e) => setName(e.target.value)}
            maxLength="50"
          />
          <InputLabel fontSize={fontSize} font={font}>
            {t('type')}
            <span>*</span>
          </InputLabel>
          <CustomSelect
            style={{ width: '100%', height: '31px' }}
            defaultValue={filterTypes[0]}
            options={filterTypes}
            onChange={(value) => setType(value.value)}
          />
        </Form>
        <ButtonContainer>
          <CustomButton
            style={{
              width: '100%',
              borderRadius: '3px',
              border: '1px dashed #ffffff',
            }}
            backgroundColor={colors.transparent}
            text={file === undefined ? t('Upload media files') : file.name}
            icon={paperclipIcon}
            onClick={handleClick}
          />
        </ButtonContainer>
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept={MEDIA_TYPES}
        />
        <MediaLabel fontSize={fontSize} font={font}>
          {t('supported_formats')} <span>png</span>, <span>jpg</span>,{' '}
          <span>jpeg</span>, <span>webp</span>, <span>mp4</span>,{' '}
          <span>mp3</span> and <span>wav</span>.
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
          text={t('submit')}
          icon={ArrowRightIcon}
          onClick={() => onSubmit()}
          backgroundColor={loading ? colors.grey : colors.orange}
          loading={loading}
          disabled={loading}
        />
      </Container>
    </Page>
  );
};

export default withRouter(AddPlaceScreen);
