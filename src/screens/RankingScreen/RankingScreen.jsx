import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Page,
  Container,
  SpinnerWrapper,
  FilterWrapper,
} from './RankingScreen.styles';
import TopBar from '../../components/TopBar/TopBar';
import { getRanking } from '../../store/actions/ranking';
import FooterBar from '../../components/FooterBar/FooterBar';
import RankingItem from '../../components/RankingItem/RankingItem';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { SELECT_MODE } from '../../components/CustomSelect/CustomSelect.constants';
import { regions } from '../../constants';

const RankingScreen = (props) => {
  const { routes } = props;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const generalRanking = useSelector((state) => state.ranking.generalRanking);
  const userRanking = useSelector((state) => state.ranking.userRanking);
  const loading = useSelector((state) => state.ranking.loading);

  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (region) {
      dispatch(getRanking(region.value)).catch((error) => {
        alert(error);
      });
    }
  }, [region, dispatch]);

  const filterRegions = useMemo(() => {
    const formatted = regions.map((r) => ({ value: r.id, label: r.name }));

    return [
      {
        value: 0,
        label: t('national'),
      },
      ...formatted,
    ];
  }, [t]);

  useEffect(() => {
    setRegion(filterRegions[0]);
  }, [filterRegions]);

  return (
    <Page>
      <TopBar title={t('ranking')} />
      <FilterWrapper>
        <CustomSelect
          mode={SELECT_MODE.dark}
          defaultValue={filterRegions[0]}
          options={filterRegions}
          onChange={(value) => setRegion(value)}
        />
      </FilterWrapper>
      {loading ? (
        <SpinnerWrapper>
          <div className="spinner-border" role="status" />
        </SpinnerWrapper>
      ) : (
        generalRanking && (
          <>
            <Container>
              {generalRanking.map((item) => (
                <RankingItem
                  key={`key_${item.id}_${item.ranking_order}`}
                  item={item}
                />
              ))}
            </Container>
            {userRanking && <RankingItem isLoggedUser item={userRanking} />}
          </>
        )
      )}

      <FooterBar routes={routes} />
    </Page>
  );
};

export default RankingScreen;
