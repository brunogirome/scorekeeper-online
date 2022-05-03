import styled from 'styled-components';

export const Container = styled.div`
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
    background-color: red;
  }
`;
