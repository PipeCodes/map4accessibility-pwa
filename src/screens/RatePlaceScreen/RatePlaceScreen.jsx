import React, { useEffect, useState, useCallback, useRef } from 'react';
import Compressor from 'compressorjs';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { colors } from '../../constants/colors';
import { MEDIA_TYPES, IMAGE_TYPES } from '../../constants';
import { getMedia } from '../../helpers/utils';
import {
  Page,
  Container,
  TextWrapper,
  Text,
  Name,
  City,
  Vote,
  ThumbsUp,
  ThumbsDown,
  Label,
  Question,
  AnswerLabel,
  Options,
  Option,
  Form,
  Comment,
  ButtonContainer,
  Title,
  MediaLabel,
  Error,
} from './RatePlaceScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import buttonUp from '../../assets/icons/places/like.svg';
import buttonDown from '../../assets/icons/places/dislike.svg';
import paperclipIcon from '../../assets/icons/paperclip.svg';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getQuestions } from '../../store/actions/questions';
import { getPlace } from '../../store/actions/places';
import {
  postPlaceEvaluation,
  postPlaceEvaluationMedia,
} from '../../store/actions/placeEvaluations';

const RatePlaceScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const loading = useSelector((state) => state.placeEvaluations.loading);

  const questions = useSelector((state) => state.questions.questions);
  const place = useSelector((state) => state.place.place);

  // Form Fields and Img input
  const [accessibility, setAccessibility] = useState(1);
  const commentRef = useRef();
  const inputRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const params = useParams();
  const [file, setFile] = useState();
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
    setFile(fileObj);
  };

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getPlace(params?.id)).catch(() => {
      alert(t('no_place'));
      dispatch(history.goBack());
    });
  }, [dispatch, params?.id, history, t]);

  const CompressSendImage = (image, id) => {
    // eslint-disable-next-line no-new
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        dispatch(postPlaceEvaluationMedia(result, id))
          .then(() => {
            history.push('/place-details/'.concat(params.id), {
              newPlace: history?.location?.state?.newPlace,
              ratePlace: true,
            });
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
  const SendFile = (file, id) => {
    dispatch(postPlaceEvaluationMedia(file, id))
      .then(() => {
        history.push('/place-details/'.concat(params.id), {
          newPlace: history?.location?.state?.newPlace,
          ratePlace: true,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onSubmit = () => {
    if (
      Object.keys(answers).length !== Object.keys(questions).length ||
      commentRef?.current?.value === null ||
      commentRef?.current?.value?.length < 6
    ) {
      setError(t('rate_error'));
    } else {
      dispatch(
        postPlaceEvaluation(
          accessibility,
          place.name,
          commentRef.current.value,
          answers,
          place.latitude,
          place.longitude,
          file,
        ),
      )
        .then((result) => {
          if (file !== undefined) {
            if (IMAGE_TYPES.includes(file?.type)) {
              CompressSendImage(file, result);
            } else {
              SendFile(file, result);
            }
          } else {
            history.push('/place-details/'.concat(params.id), {
              newPlace: history?.location?.state?.newPlace,
              ratePlace: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClickThumbsUp = () => {
    setAccessibility(1);
  };

  const onClickThumbsDown = () => {
    setAccessibility(0);
  };

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backClickHandler = () => {
    if (history?.location?.state?.newPlace) {
      history.replace(routes.MAP.path);
    } else if (history?.location?.state?.ratePlace) {
      history.go(-2);
    } else {
      history.goBack();
    }
  };

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasBackButton
        backTarget={() => backClickHandler()}
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('comment')}
      />
      <ImageSlider photos={getMedia(place)} />
      <Container>
        <TextWrapper>
          <Name fontSize={fontSize} font={font}>
            {place?.name}
          </Name>
          {place?.city ? (
            <City fontSize={fontSize} font={font}>
              {place?.city}
            </City>
          ) : (
            <City fontSize={fontSize} font={font}>
              {t('obstacle')}
            </City>
          )}
        </TextWrapper>
        <Text fontSize={fontSize} font={font}>
          {t('rate_place')}
        </Text>
        <Vote>
          <ThumbsUp
            fontSize={fontSize}
            font={font}
            thumbs={accessibility}
            onClick={() => onClickThumbsUp()}
          >
            <img src={buttonUp} alt={t('accessible')} />
            <span>{t('accessible')}</span>
          </ThumbsUp>
          <ThumbsDown
            fontSize={fontSize}
            font={font}
            thumbs={accessibility}
            onClick={() => onClickThumbsDown()}
          >
            <img src={buttonDown} alt={t('not_accessible')} />
            <span>{t('not_accessible')}</span>
          </ThumbsDown>
        </Vote>
        <Form className="questions">
          <Label fontSize={fontSize} font={font}>
            {t('comment')}
          </Label>
          <Comment maxlength={255} rows={5} ref={commentRef} />
          <Label fontSize={fontSize} font={font}>
            {t('questions')}
          </Label>
          {questions &&
            questions.map((item, index) => (
              <Question key={index}>
                <Title fontSize={fontSize} font={font}>
                  {index + 1}. {item?.title}
                </Title>
                <Options>
                  {item?.answers &&
                    item?.answers.map((answer) => (
                      <Option key={answer?.id}>
                        <input
                          type="radio"
                          name={item?.id}
                          id={answer?.id}
                          onChange={() => {
                            setAnswers((prevState) => ({
                              ...prevState,
                              [item?.id]: answer?.id,
                            }));
                          }}
                        />
                        <AnswerLabel
                          fontSize={fontSize}
                          font={font}
                          for={answer?.id}
                        >
                          {answer?.body}
                        </AnswerLabel>
                      </Option>
                    ))}
                </Options>
              </Question>
            ))}
        </Form>
        <ButtonContainer>
          <CustomButton
            style={{
              width: '100%',
              borderRadius: '3px',
              border: '1px dashed #ffffff',
            }}
            backgroundColor={colors.transparent}
            text={file === undefined ? t('Upload media files') : file?.name}
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

export default withRouter(RatePlaceScreen);
