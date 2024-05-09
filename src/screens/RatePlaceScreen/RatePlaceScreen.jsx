import React, { useEffect, useState, useCallback, useRef } from 'react';
import Compressor from 'compressorjs';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useJsApiLoader } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { colors } from '../../constants/colors';
import { MEDIA_TYPES, IMAGE_TYPES, GOOGLE_MAPS_OPTIONS } from '../../constants';
import { getMedia, isDefined } from '../../helpers/utils';
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
  Neutral,
  Accordion,
  InfoText,
} from './RatePlaceScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import buttonUp from '../../assets/icons/places/like.svg';
import buttonDown from '../../assets/icons/places/dislike.svg';
import buttonNeutral from '../../assets/icons/places/neutral.svg';
import paperclipIcon from '../../assets/icons/paperclip.svg';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getQuestions } from '../../store/actions/questions';
import upIcon from '../../assets/icons/up.svg';
import downIcon from '../../assets/icons/down.svg';
import {
  getPlace,
  getGooglePlace,
  getMorePlaceInfo,
} from '../../store/actions/places';
import {
  postPlaceEvaluation,
  postPlaceEvaluationMedia,
} from '../../store/actions/placeEvaluations';
import DisabilityOptions from './DisabilityOptions';
import { DISABILITIES } from '../../constants/disabilityTypes';

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
  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_OPTIONS);
  const questions = useSelector((state) => state.questions.questions);
  const place = useSelector((state) => state.place.place);
  const [optionalQuestions, setOptionalQuestions] = useState({});

  // Form Fields and Img input
  const [accessibility, setAccessibility] = useState(2);
  const [disabilityData, setDisabilityData] = useState([]);
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

  const handleOptionalClick = (id) => {
    setOptionalQuestions((prev) => {
      if (Object.values(optionalQuestions).includes(id)) {
        return { ...prev, id: null };
      }
      return { ...prev, id };
    });
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
    if (isLoaded) {
      dispatch(getQuestions());
      if (isDefined(params?.google_place_id)) {
        dispatch(getGooglePlace(params?.google_place_id));
        if (isDefined(params?.id)) {
          dispatch(getMorePlaceInfo(params?.id));
        }
      } else {
        dispatch(getPlace(params?.id)).catch(() => {
          // eslint-disable-next-line no-undef
          alert(t('no_place'));
          dispatch(history.goBack());
        });
      }
    }
  }, [dispatch, params.google_place_id, params.id, history, t, isLoaded]);

  const compressSendImage = (image, id, placeId) => {
    // eslint-disable-next-line no-new
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        dispatch(postPlaceEvaluationMedia(result, id))
          .then(() => {
            history.push(
              '/place-details/'
                .concat(placeId)
                .concat('/')
                .concat(params.google_place_id),
              {
                newPlace: history?.location?.state?.newPlace,
                ratePlace: true,
              },
            );
          })
          .catch((err) => {
            // eslint-disable-next-line no-undef
            alert(err);
          });
      },
      error(err) {
        // eslint-disable-next-line no-undef
        alert(err.message);
      },
    });
  };
  const sendFile = (file, id, placeId) => {
    dispatch(postPlaceEvaluationMedia(file, id))
      .then(() => {
        history.push(
          '/place-details/'
            .concat(placeId)
            .concat('/')
            .concat(params.google_place_id),
          {
            newPlace: history?.location?.state?.newPlace,
            ratePlace: true,
          },
        );
      })
      .catch((err) => {
        // eslint-disable-next-line no-undef
        alert(err);
      });
  };

  const onSubmit = () => {
    if (
      (Object.keys(answers).filter((key) => key.includes('mandatory'))
        .length !== Object.keys(questions?.mandatory).length &&
        isDefined(params?.google_place_id)) ||
      (commentRef?.current?.value !== '' &&
        commentRef?.current?.value?.length < 6)
    ) {
      setError(t('rate_error'));
    } else {
      dispatch(
        postPlaceEvaluation(
          accessibility,
          place?.name,
          commentRef?.current?.value,
          answers,
          place?.latitude,
          place?.longitude,
          file,
          place?.city,
          place?.country_code,
          place?.place_type,
          place?.google_place_id,
          disabilityData,
        ),
      )
        .then((result) => {
          if (file !== undefined) {
            if (IMAGE_TYPES.includes(file?.type)) {
              compressSendImage(file, result.id, result?.place?.id);
            } else {
              sendFile(file, result.id, result?.place?.id);
            }
          } else {
            history.push(
              '/place-details/'
                .concat(result?.place?.id)
                .concat('/')
                .concat(params.google_place_id),
              {
                newPlace: history?.location?.state?.newPlace,
                ratePlace: true,
              },
            );
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-undef
          alert(err);
        })
        .finally(() => {
          history.push(routes.MAP.path, {
            search: {
              location: {
                lat: Number(place?.latitude),
                lng: Number(place?.longitude),
              },
            },
          });
        });
    }
  };

  const onClickThumbsUp = () => {
    setAccessibility(2);
  };

  const onClickNeutral = () => {
    setAccessibility(1);
  };

  const onClickThumbsDown = () => {
    setAccessibility(0);
  };

  // ClickHandlers
  const disabilityClickHandler = useCallback(
    (disabilityOpt) => {
      switch (disabilityOpt) {
        case DISABILITIES?.NO_DISABILITY:
          setDisabilityData((prev) =>
            prev.filter(
              (item) =>
                ![
                  DISABILITIES?.MOTOR,
                  DISABILITIES?.VISUAL,
                  DISABILITIES?.HEARING,
                  DISABILITIES?.INTELLECTUAL,
                ].includes(item),
            ),
          );
          break;
        case DISABILITIES?.MOTOR:
          if (disabilityData.includes(DISABILITIES?.NO_DISABILITY))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.NO_DISABILITY),
            );
          if (disabilityData.includes(DISABILITIES?.MOTOR))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.MOTOR),
            );
          else setDisabilityData((prev) => [...prev, DISABILITIES?.MOTOR]);
          break;
        case DISABILITIES?.VISUAL:
          if (disabilityData.includes(DISABILITIES?.NO_DISABILITY))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.NO_DISABILITY),
            );
          if (disabilityData.includes(DISABILITIES?.VISUAL))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.VISUAL),
            );
          else setDisabilityData((prev) => [...prev, DISABILITIES?.VISUAL]);
          break;
        case DISABILITIES?.HEARING:
          if (disabilityData.includes(DISABILITIES?.NO_DISABILITY))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.NO_DISABILITY),
            );
          if (disabilityData.includes(DISABILITIES?.HEARING))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.HEARING),
            );
          else setDisabilityData((prev) => [...prev, DISABILITIES?.HEARING]);
          break;
        case DISABILITIES?.INTELLECTUAL:
          if (disabilityData.includes(DISABILITIES?.NO_DISABILITY))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.NO_DISABILITY),
            );
          if (disabilityData.includes(DISABILITIES?.INTELLECTUAL))
            setDisabilityData((prev) =>
              prev.filter((item) => item !== DISABILITIES?.INTELLECTUAL),
            );
          else
            setDisabilityData((prev) => [...prev, DISABILITIES?.INTELLECTUAL]);
          break;
        default:
          break;
      }
    },
    [disabilityData],
  );

  const openAccessibility = useCallback(() => {
    history.push(routes.ACCESSIBILITY.path);
  }, [history, routes]);

  const backClickHandler = () => {
    if (history?.location?.state?.newPlace) {
      history.replace(routes.MAP.path);
    } else if (history?.location?.state?.ratePlace) {
      history.go(-2);
    } else if (history?.location?.state?.placePopup) {
      history.push(routes.MAP.path, {
        returnToMap: {
          location: {
            lat: parseFloat(place?.latitude),
            lng: parseFloat(place?.longitude),
          },
        },
      });
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
            <img
              src={buttonUp}
              alt={`${t('accessible')} - ${t('alt_text.icon')}`}
            />
            <span>{t('accessible')}</span>
          </ThumbsUp>
          <Neutral
            fontSize={fontSize}
            font={font}
            thumbs={accessibility}
            onClick={() => onClickNeutral()}
          >
            <img
              src={buttonNeutral}
              alt={`${t('neutral')} - ${t('alt_text.icon')}`}
            />
            <span>{t('neutral')}</span>
          </Neutral>
          <ThumbsDown
            fontSize={fontSize}
            font={font}
            thumbs={accessibility}
            onClick={() => onClickThumbsDown()}
          >
            <img
              src={buttonDown}
              alt={`${t('not_accessible')} - ${t('alt_text.icon')}`}
            />
            <span>{t('not_accessible')}</span>
          </ThumbsDown>
        </Vote>

        <DisabilityOptions
          disabilityClickHandler={disabilityClickHandler}
          disabilityData={disabilityData}
        />

        <Form className="questions">
          <Label fontSize={fontSize} font={font} htmlFor="comment-section">
            {t('comment')}
          </Label>
          <Comment
            maxlength={255}
            rows={5}
            ref={commentRef}
            id="comment-section"
          />
          <InfoText fontSize={fontSize} font={font}>
            {t('mandatory_questions')}
          </InfoText>
          {isDefined(params?.google_place_id) && (
            <>
              {questions?.mandatory &&
                questions.mandatory.map((item, index) => (
                  <Question key={item.id}>
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
                                  [`${index}_mandatory`]: {
                                    question: item?.title,
                                    answer: answer?.body,
                                  },
                                }));
                              }}
                            />
                            <AnswerLabel
                              fontSize={fontSize}
                              font={font}
                              htmlFor={answer?.id}
                            >
                              {answer?.body}
                            </AnswerLabel>
                          </Option>
                        ))}
                    </Options>
                  </Question>
                ))}
              <InfoText fontSize={fontSize} font={font}>
                {t('optional_questions')}
              </InfoText>
              {questions?.optional &&
                Object.entries(questions?.optional)
                  .reverse()
                  .map((group, index) => (
                    <Accordion key={index}>
                      <button
                        type="button"
                        onClick={() => {
                          handleOptionalClick(group?.[0]);
                        }}
                        className="head"
                      >
                        <div>{group?.[0]}</div>
                        {Object.values(optionalQuestions).includes(
                          group?.[0],
                        ) ? (
                          <img src={upIcon} alt="closed" />
                        ) : (
                          <img src={downIcon} alt="open" />
                        )}
                      </button>
                      <div
                        className="content"
                        id={
                          Object.values(optionalQuestions).includes(
                            group?.[0],
                          ) && 'active'
                        }
                      >
                        {group?.[1].map((item, index) => (
                          <Question key={item.id}>
                            <Title fontSize={fontSize} font={font}>
                              {index + 1}. {item?.title?.split(':')[1]}
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
                                          [`${index}_optional`]: {
                                            question: item?.title,
                                            answer: answer?.body,
                                          },
                                        }));
                                      }}
                                    />
                                    <AnswerLabel
                                      fontSize={fontSize}
                                      font={font}
                                      htmlFor={answer?.id}
                                    >
                                      {answer?.body}
                                    </AnswerLabel>
                                  </Option>
                                ))}
                            </Options>
                          </Question>
                        ))}
                      </div>
                    </Accordion>
                  ))}
            </>
          )}
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
          id="file"
        />
        <MediaLabel fontSize={fontSize} font={font} htmlFor="file">
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
