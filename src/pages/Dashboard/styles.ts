import styled from 'styled-components';

export const Container = styled.main`
  display: flex;

  width: 1100px;

  margin: 50px auto 0 auto;

  height: calc(100vmin - 50px);

  h2 {
    margin: 10px auto;

    color: #666666;

    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;

    text-transform: uppercase;
  }

  section {
    display: flex;
    flex-direction: column;

    & > div {
      background: #fcfcfc;
      border-radius: 6px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;
