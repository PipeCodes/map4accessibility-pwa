import { t } from 'i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import ThumbsUp from '../../assets/icons/maps/up.svg';
import ThumbsDown from '../../assets/icons/maps/down.svg';
import Pending from '../../assets/icons/maps/pending.svg';
import Rejected from '../../assets/icons/maps/rejected.svg';
import Accepted from '../../assets/icons/maps/accepted.svg';
import {
  Container,
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
} from './Mycomments.styles';

const MyComments = (props) => {
  const { positive, negative, accepted, rejected, pending, comments } = props;
  const fontSize = useSelector((state) => state.accessibility.fontSize);
  const font = useSelector((state) => state.accessibility.font);
  const backgroundColor = useSelector(
    (state) => state.accessibility.backgroundColor,
  );
  return (
    <Container backgroundColor={backgroundColor}>
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
                  <img src={ThumbsUp} alt={t('positive')} />
                  <span>{t('positive')}</span>
                </Label>
                <Count font={font} fontSize={fontSize} color={colors.green}>
                  {positive && positive}
                </Count>
              </Box>
              <Box>
                <Label font={font} fontSize={fontSize}>
                  <img src={ThumbsDown} alt={t('negative')} />
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
                  <img src={Accepted} alt={t('accepted')} />
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
                  <img src={Rejected} alt={t('rejected')} />
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
            <Line>
              <Box>
                <Label font={font} fontSize={fontSize}>
                  <img src={Pending} alt={t('pending')} />
                  <span>{t('pending')}</span>
                </Label>
                <Count
                  font={font}
                  fontSize={fontSize}
                  color={colors.primaryTextColor}
                >
                  {pending && pending}
                </Count>
              </Box>
            </Line>
          </BoxWrapper>
        </BotWrapper>
      </Wrapper>
    </Container>
  );
};

export default MyComments;
