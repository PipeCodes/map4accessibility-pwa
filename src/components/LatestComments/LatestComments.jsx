import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import buttonUp from '../../assets/icons/places/like.svg';
import buttonDown from '../../assets/icons/places/dislike.svg';
import Pending from '../../assets/icons/maps/pending.svg';
import Rejected from '../../assets/icons/maps/rejected.svg';
import Accepted from '../../assets/icons/maps/accepted.svg';
import Avatar from '../../assets/images/avatarDefault.png';
import { getFirstImage } from '../../helpers/utils';
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
  Media,
  Img,
  Box,
} from './LatestComments.styles';
import { IMAGE_TYPES } from '../../constants';

const Thumbs = [buttonDown, buttonUp];

const LatestComments = (props) => {
  const { comments, myComments } = props;
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

  const renderState = (param) => {
    switch (param) {
      case 'pending':
        return <img src={Pending} alt="pending" />;
      case 'accepted':
        return <img src={Accepted} alt="accepted" />;
      case 'rejected':
        return <img src={Rejected} alt="rejected" />;
      default:
        return '';
    }
  };

  return (
    <Container>
      <Title>{t('latest')}</Title>
      {myComments
        ? commentsList
          ? commentsList.map((comment) => {
              const image = getFirstImage(comment?.place);
              let mediaType;
              if (comment?.media_url) {
                const type = comment?.media_url?.split('.').pop();

                if (type === 'mp3' || type === 'wav') {
                  mediaType = 'audio'.concat('/').concat(type);
                } else if (type === 'mp4') {
                  mediaType = 'video'.concat('/').concat(type);
                } else {
                  mediaType = 'image'.concat('/').concat(type);
                }
              }

              return (
                <Comment backgroundColor={backgroundColor} key={comment.id}>
                  <Top>
                    {image?.file_url ? (
                      <Image src={image?.file_url} />
                    ) : (
                      <Image src={image} />
                    )}
                    <Name fontSize={fontSize} font={font}>
                      {comment?.place && comment?.place?.name}
                    </Name>
                    <Status>{renderState(comment?.status)}</Status>
                  </Top>
                  <Accessible backgroundColor={backgroundColor}>
                    <Icon src={Thumbs[comment?.thumb_direction ? 1 : 0]} />
                    <Label fontSize={fontSize} font={font}>
                      {comment?.thumb_direction
                        ? t('accessible')
                        : t('not_accessible')}
                    </Label>
                  </Accessible>
                  <Box className={mediaType?.split('/', 1)}>
                    {comment.media_url && (
                      <Media>
                        {!IMAGE_TYPES.includes(mediaType) ? (
                          <video controls className={mediaType.split('/', 1)}>
                            <source src={comment?.media_url} type={mediaType} />
                          </video>
                        ) : (
                          <Img
                            src={comment?.media_url}
                            className={mediaType.split('/', 1)}
                          />
                        )}
                      </Media>
                    )}

                    <Body fontSize={fontSize} font={font}>
                      {comment.comment}
                    </Body>
                  </Box>
                </Comment>
              );
            })
          : t('no_results')
        : commentsList
        ? commentsList.map((comment) => {
            let mediaType;
            if (comment?.media_url) {
              const type = comment?.media_url?.split('.').pop();

              if (type === 'mp3' || type === 'wav') {
                mediaType = 'audio'.concat('/').concat(type);
              } else if (type === 'mp4') {
                mediaType = 'video'.concat('/').concat(type);
              } else {
                mediaType = 'image'.concat('/').concat(type);
              }
            }
            return (
              <Comment backgroundColor={backgroundColor} key={comment.id}>
                <Top>
                  {comment?.app_user?.avatar ? (
                    <Image
                      src={process.env.REACT_APP_EXTERNAL_LINKS_BASE.concat(
                        `/${comment?.app_user?.avatar}`,
                      )}
                    />
                  ) : (
                    <Image src={Avatar} />
                  )}
                  <Name fontSize={fontSize} font={font}>
                    {comment?.app_user &&
                      comment?.app_user?.name
                        .concat(' ')
                        .concat(comment?.app_user?.surname)}
                  </Name>
                </Top>
                <Accessible backgroundColor={backgroundColor}>
                  <Icon src={Thumbs[comment?.thumb_direction ? 1 : 0]} />
                  <Label fontSize={fontSize} font={font}>
                    {comment?.thumb_direction
                      ? t('accessible')
                      : t('not_accessible')}
                  </Label>
                </Accessible>
                <Box className={mediaType?.split('/', 1)}>
                  {comment.media_url && (
                    <Media>
                      {!IMAGE_TYPES.includes(mediaType) ? (
                        <video controls className={mediaType.split('/', 1)}>
                          <source src={comment?.media_url} type={mediaType} />
                        </video>
                      ) : (
                        <Img
                          src={comment?.media_url}
                          className={mediaType.split('/', 1)}
                        />
                      )}
                    </Media>
                  )}
                  <Body fontSize={fontSize} font={font}>
                    {comment.comment}
                  </Body>
                </Box>
              </Comment>
            );
          })
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
