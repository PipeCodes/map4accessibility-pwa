import React, { useMemo } from 'react';
import { AVATARS } from '../../constants';
import {
  ItemContainer,
  LeftContainer,
  Position,
  Avatar,
  Username,
  Points,
} from './RankingItem.styles';

const RankingItem = (props) => {
  const { item, isLoggedUser } = props;

  const avatar = useMemo(
    () => AVATARS.find((a) => a.id === item.avatar)?.element,
    [item, isLoggedUser],
  );

  return (
    <ItemContainer isLoggedUser={isLoggedUser} {...props}>
      <LeftContainer>
        <Position isLoggedUser={isLoggedUser} position={item.ranking_order}>
          {item.ranking_order ?? '-'}
        </Position>
        <Avatar isLoggedUser={isLoggedUser} src={avatar} />
        <Username isLoggedUser={isLoggedUser}>
          {item.username ?? item.name}
        </Username>
      </LeftContainer>
      <Points isLoggedUser={isLoggedUser}>{`${item.points ?? '0'} pts`}</Points>
    </ItemContainer>
  );
};

export default RankingItem;
