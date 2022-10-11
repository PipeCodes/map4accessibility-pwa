import React, { useEffect } from 'react';
import * as DOMPurify from 'dompurify';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import { Page, Container, SpinnerWrapper } from './PolicyScreen.styles';
import { getPolicy } from '../../store/actions/policy';

const PolicyScreen = () => {

  const dispatch = useDispatch();

  const policy = useSelector((state) => state.policy.policy);
  const loading = useSelector((state) => state.policy.loading);

  useEffect(() => {
    dispatch(getPolicy());
  }, [dispatch]);

  return (
    <Page>
      <TopBar hasBackButton />
      <Container>
        {loading ? (
          <SpinnerWrapper>
            <div className="spinner-border" role="status" />
          </SpinnerWrapper>
        ) : (
          policy && (
            <div
              style={{ padding: '20px', color: '#fff' }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(policy.privacy_policy) }}
            />
          )
        )}
      </Container>
    </Page>
  );
};

export default withRouter(PolicyScreen);
