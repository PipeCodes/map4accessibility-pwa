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
import { GOOGLE_MAPS_OPTIONS, IMAGE_TYPES } from '../../constants';
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

const AddPlaceScreen = (props) => {
  const { history, routes, location } = props;
  const { state } = location;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const loading = useSelector((state) => state.place.loading);

  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);

  const filterTypes = useMemo(() => {
    const formatted = types.map((option) => ({
      value: option.label,
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
  const [img, setImg] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoaded && state) {
      // Reference https://gist.github.com/AmirHossein/92a0597b5f723b19c648
      const latlng = new google.maps.LatLng(state.lat, state.lng);
      new google.maps.Geocoder().geocode(
        { latLng: latlng },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              let city = null;
              let country = null;
              let counter;
              let counterLength;
              let component;
              for (let r = 0, rl = results.length; r < rl; r += 1) {
                const result = results[r];

                if (!city && result.types[0] === 'locality') {
                  for (
                    counter = 0,
                      counterLength = result.address_components.length;
                    counter < counterLength;
                    counter += 1
                  ) {
                    component = result.address_components[counter];

                    if (component.types[0] === 'locality') {
                      city = component.long_name;
                      break;
                    }
                  }
                } else if (!country && result.types[0] === 'country') {
                  country = result.address_components[0].short_name;
                }

                if (city && country) {
                  break;
                }
              }
              setCoutry(country);
              setCity(city);
            }
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
    setImg(fileObj);
  };

  const CompressSendImage = (image, id) => {
    // eslint-disable-next-line no-new
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        dispatch(postPlaceMedia(result, id))
          .then(() => {
            history.push('/rate-place/'.concat(id));
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
    if (name === '' || name === null) {
      setError(t('create_error'));
    } else {
      dispatch(postPlace(name, type, city, state, country, img))
        .then((result) => {
          if (img !== undefined) {
            CompressSendImage(img, result);
          } else {
            history.push('/rate-place/'.concat(result), { newPlace: true });
          }
        })
        .catch((err) => {
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
          accept={IMAGE_TYPES}
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
