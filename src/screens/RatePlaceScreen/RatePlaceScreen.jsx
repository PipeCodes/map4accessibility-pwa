import React, { useEffect, useState, useCallback, useRef } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmptyObject } from 'jquery';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { colors } from '../../constants/colors';
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
} from './RatePlace.styles';
import TopBar from '../../components/TopBar/TopBar';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import buttonUp from '../../assets/icons/places/like.svg';
import buttonDown from '../../assets/icons/places/dislike.svg';
import paperclipIcon from '../../assets/icons/paperclip.svg';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getQuestions } from '../../store/actions/questions';
import {
  getPlace,
  postPlaceEvaluation,
  postPlaceEvaluationMedia,
} from '../../store/actions/places';
import placeholder from '../../assets/images/photo-stock-1.png';

const photos = [placeholder, placeholder, placeholder];

const RatePlaceScreen = (props) => {
  const { history, routes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const questions = useSelector((state) => state.questions.questions);
  const place = useSelector((state) => state.place.place);
  const [accessibility, setAccessibility] = useState(1);
  const font = useSelector((state) => state.accessibility.font);
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  const commentRef = useRef();
  const inputRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const params = useParams();
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

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getPlace(params.id));
  }, [dispatch, params.id]);

  const onSubmit = () => {
    if (
      Object.keys(answers).length !== Object.keys(questions).length ||
      commentRef.current.value === null ||
      commentRef.current.value.length < 6
    ) {
      setError(t('rate_error'));
    } else {
      dispatch(
        postPlaceEvaluation(
          accessibility,
          commentRef.current.value,
          answers,
          place.latitude,
          place.longitude,
        ),
      )
        .then((result) => {
          if (img !== undefined) {
            dispatch(postPlaceEvaluationMedia(img, result))
              .then((result) => {
                alert(result);
              })
              .catch((err) => {
                console.log(err);
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

  return (
    <Page backgroundColor={backgroundColor}>
      <TopBar
        aligned
        page
        hasBackButton
        backgroundColor={backgroundColor}
        hasAccessibilityButton={openAccessibility}
        title={t('comment')}
      />
      <ImageSlider
        photos={
          place?.media_evaluations?.length ? place.media_evaluations : photos
        }
      />
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
        <Text fontSize={fontSize}>{t('rate_place')}</Text>
        <Vote>
          <ThumbsUp thumbs={accessibility} onClick={() => onClickThumbsUp()}>
            <img src={buttonUp} alt={t('accessible')} />
            <span>{t('accessible')}</span>
          </ThumbsUp>
          <ThumbsDown
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
                  {index + 1}. {item.id}
                </Title>
                <Options>
                  {item.answers &&
                    item.answers.map((answer) => (
                      <Option key={answer.id}>
                        <input
                          type="radio"
                          name={item.id}
                          id={answer.id}
                          onChange={() => {
                            setAnswers((prevState) => ({
                              ...prevState,
                              [item.id]: answer.id,
                            }));
                          }}
                        />
                        <AnswerLabel
                          fontSize={fontSize}
                          font={font}
                          for={answer.id}
                        >
                          {answer.body}
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
