import React, { useEffect, useMemo } from 'react';
import * as DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import FAQsAccordion from '../../components/FAQsAccordion/FAQsAccordion';
import { Page, Container, SpinnerWrapper } from './FAQsScreen.styles';
import { colors } from '../../constants/colors';
import TopBar from '../../components/TopBar/TopBar';
import { getFAQs } from '../../store/actions/faqs';

const FAQsScreen = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const faqs = useSelector((state) => state.faqs.faqs);
  const loading = useSelector((state) => state.faqs.loading);

  const titles = useMemo(() => faqs?.map((item) => item.title), [faqs]);

  useEffect(() => {
    dispatch(getFAQs());
  }, [dispatch]);

  return (
    <Page>
      <TopBar hasBackButton title={t('faqs')} />
      <Container>
        {loading ? (
          <SpinnerWrapper>
            <div className="spinner-border" role="status" />
          </SpinnerWrapper>
        ) : (
          faqs && (
            <FAQsAccordion headerColor={colors.green} titles={titles}>
              {faqs.map((item) => (
                <span
                  key={item.id}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.body) }}
                />
              ))}
            </FAQsAccordion>
          )
        )}
      </Container>
    </Page>
  );
};

export default FAQsScreen;
