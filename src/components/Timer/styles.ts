import styled from 'styled-components';

export const Container = styled.div`
  margin-left: auto;

  width: 310px;
  max-width: 310px;

  display: flex;

  flex-direction: column;

  h1 {
    color: var(--gray-2);
    margin-left: auto;
    margin-right: auto;

    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    text-transform: uppercase;
  }

  > div {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--gray-1);
    font-family: 'Digital Numbers';
    font-style: normal;
    font-weight: 400;

    > div {
      display: flex;
      flex-direction: row;
    }

    p {
      font-size: 48px;
      line-height: 62px;
    }

    span {
      height: 100%;
      margin-top: auto;
      font-size: 28px;
    }
  }
`;
