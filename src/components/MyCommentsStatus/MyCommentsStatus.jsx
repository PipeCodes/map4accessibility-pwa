import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
import Rejected from '../../assets/icons/maps/rejected.svg';
import Accepted from '../../assets/icons/maps/accepted.svg';
import Neutral from '../../assets/icons/places/neutral.svg';
import {
  Wrapper,
  TopWrapper,
  Title,
  Counter,
  SubTitle,
  BotWrapper,
  BoxWrapper,
  Label,
  Line,
  Box,
  Count,
} from './MyCommentsStatus.styles';

const MyCommentsStatus = (props) => {
  const { positive, negative, accepted, rejected, neutral, comments } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);

  return (
    <Wrapper>
      <TopWrapper>
        <Title font={font} fontSize={fontSize}>
          {t('my_comments')}
        </Title>
        <Counter font={font} fontSize={fontSize}>
          {t('total')}
          <span>{comments?.length}</span>
        </Counter>
      </TopWrapper>
      <BotWrapper>
        <SubTitle font={font} fontSize={fontSize}>
          {t('status')}
        </SubTitle>
        <BoxWrapper>
          <Line>
            <Box>
              <Label font={font} fontSize={fontSize}>
                <img src={ThumbsUp} alt={t('alt_text.positive_icon')} />
                <span>{t('positive')}</span>
              </Label>
              <Count font={font} fontSize={fontSize} color={colors.green}>
                {positive && positive}
              </Count>
            </Box>
            <Box>
              <Label font={font} fontSize={fontSize}>
                <img src={Neutral} alt={t('alt_text.neutral_icon')} />
                <span>{t('neutral')}</span>
              </Label>
              <Count font={font} fontSize={fontSize} color={colors.orange}>
                {neutral && neutral}
              </Count>
            </Box>
            <Box>
              <Label font={font} fontSize={fontSize}>
                <img src={ThumbsDown} alt={t('alt_text.negative_icon')} />
                <span>{t('negative')}</span>
              </Label>
              <Count font={font} fontSize={fontSize} color={colors.red}>
                {negative && negative}
              </Count>
            </Box>
          </Line>
          <Line>
            <Box>
              <Label font={font} fontSize={fontSize}>
                <img src={Accepted} alt={t('alt_text.accepted_icon')} />
                <span>{t('accepted')}</span>
              </Label>
              <Count
                font={font}
                fontSize={fontSize}
                color={colors.primaryTextColor}
              >
                {accepted && accepted}
              </Count>
            </Box>
            <Box>
              <Label font={font} fontSize={fontSize}>
                <img src={Rejected} alt={t('alt_text.rejected_icon')} />
                <span>{t('rejected')}</span>
              </Label>
              <Count
                font={font}
                fontSize={fontSize}
                color={colors.primaryTextColor}
              >
                {rejected && rejected}
              </Count>
            </Box>
          </Line>
        </BoxWrapper>
      </BotWrapper>
    </Wrapper>
  );
};

export default MyCommentsStatus;
