import styled from 'styled-components';

export const Container = styled.div<{ storeLogo: string }>`
  min-height: 190px;
  height: 19.9vh;

  border-bottom: 1px solid var(--gray-1);

  .content {
    max-width: 1280px;
    height: 180px;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: row;

    .text {
      h1,
      h2 {
        color: var(--gray-1);
        text-transform: uppercase;
      }

      h2 {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 24;
        font-weight: 700;
      }

      h1 {
        font-size: 48;
        font-family: sans-serif;
        font-family: 'Open Sans', sans-serif;
        font-weight: 800;
      }
    }
  }

  .logo {
    margin-right: 25px;

    width: 180px;
    height: 180px;
    /* background-color: red; */
    background-image: ${props => props.storeLogo};
  }
`;

export const TimerContainer = styled.div`
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
