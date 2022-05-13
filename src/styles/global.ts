import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #e5e5e5;

    --gray-1: #333333;
    --gray-2: #666666;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    font-family: 'Source Sans Pro';

    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  .react-modal-overlay{
    background: rgba(0,0,0,0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--background);
    padding: 25px;
    position: relative;
    border-radius: 0.25rem;
  }
`;
