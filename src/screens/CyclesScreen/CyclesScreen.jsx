import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Page, Container, SpinnerWrapper, Title, CycleListContainer, IllustrationContainer, Illustration } from './CyclesScreen.styles';
import FooterBar from '../../components/FooterBar/FooterBar';
import CycleListCard from '../../components/CycleListCard/CycleListCard';
import { getCycles } from '../../store/actions/cycles';

const CyclesScreen = (props) => {
  const { history, routes } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cycles.items);
  const loading = useSelector((state) => state.cycles.loading);

  useEffect(() => {
    dispatch(getCycles());
  }, [dispatch]);

  const itemClickHandler = (item) => {
    history.push({
      pathname: routes.SELECT_LEVEL.path.replace(":id", item.id),
      state: {
        cycle: item
      }
    });
  };

  return (
    <Page>
      {loading || (!items || items.length === 0) ? (
        <SpinnerWrapper>
          <div className="spinner-border" role="status" />
        </SpinnerWrapper>
      ) : (
        <Container>
          <Title>{t("level_select")}</Title>
          <IllustrationContainer>
            <Illustration />
          </IllustrationContainer>
          <CycleListContainer>
            {items.map((item) => (
              <CycleListCard key={item.id} item={item} onItemClick={itemClickHandler} />
            ))}
          </CycleListContainer>
        </Container>
      )}

      <FooterBar routes={routes} />
    </Page>
  );
};

export default withRouter(CyclesScreen);
