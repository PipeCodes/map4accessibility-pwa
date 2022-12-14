import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import placeImage from '../../assets/images/place.png';
import buttonUp from '../../assets/icons/places/like.svg';
import buttonDown from '../../assets/icons/places/dislike.svg';
import {
  Container,
  Title,
  Comment,
  Top,
  Image,
  Accessible,
  Icon,
  Label,
  Body,
  Status,
  Name,
  ShowAll,
} from './LatestComments.styles';

const Thumbs = [buttonDown, buttonUp];

const LatestComments = (props) => {
  const { comments } = props;
  const { t } = useTranslation();
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const [viewAll, setViewAll] = useState(false);
  const [commentsList, setCommentsList] = useState([]);

  const viewAllHandler = () => {
    setViewAll((prevState) => !prevState);
  };

  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );

  useEffect(() => {
    if (viewAll) {
      setCommentsList(comments);
    } else {
      setCommentsList(comments?.slice(0, 5));
    }
  }, [viewAll, comments]);

  return (
    <Container>
      <Title>{t('latest')}</Title>
      {commentsList
        ? commentsList.reverse().map((comment) => (
            <Comment backgroundColor={backgroundColor} key={comment.id}>
              <Top>
                {comment?.media_url ? (
                  <Image src={comment?.media_url[0]?.file_url} />
                ) : (
                  <Image src={placeImage} />
                )}
                <Name fontSize={fontSize} font={font}>
                  Anonymous{/* Placeholder while there is no data from API  */}
                </Name>
                <Status>
                  O{/* Placeholder while there is no data from API  */}
                </Status>
              </Top>
              <Accessible backgroundColor={backgroundColor}>
                <Icon src={Thumbs[comment?.thumb_direction ? 1 : 0]} />
                <Label fontSize={fontSize} font={font}>
                  {comment?.thumb_direction
                    ? t('accessible')
                    : t('not_accessible')}
                </Label>
              </Accessible>
              <Body fontSize={fontSize} font={font}>
                {comment.comment}
              </Body>
            </Comment>
          ))
        : t('no_results')}
      <ShowAll
        fontSize={fontSize}
        font={font}
        type="button"
        onClick={() => viewAllHandler()}
      >
        {viewAll ? t('show_less') : t('view_all')}
      </ShowAll>
    </Container>
  );
};

export default LatestComments;
