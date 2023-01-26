import styled from 'styled-components';

export const Img = styled.img`
  visibility: visible;
  width: 100% !important;
  height: 420px;
  object-fit: cover;
`;

export const Media = styled.video`
  height: auto;
  &.audio {
    height: 60px;
    margin-top: 200px;
  }
`;
