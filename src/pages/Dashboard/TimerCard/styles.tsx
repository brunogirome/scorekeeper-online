import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 305px;

  margin: 10px 5px 5px 10px;

  .timer-number {
    font-style: normal;
    font-weight: 700;
    font-size: 72px;
    line-height: 91px;

    color: #333333;

    padding: 0;

    text-align: center;

    span {
      font-size: 48px;
    }
  }

  button {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #fdfdfd;

    text-transform: uppercase;

    background: #4870d7;

    border: 0;
    padding: 0 16px;
    transition: background-color 0.2s;

    width: 285px;
    height: 50px;
    border-radius: 5px;

    &:hover {
      background: ${shade(0.2, '#4870d7')};
    }

    margin-bottom: 30px;
  }

  div {
    border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: none !important;

    border-radius: 0 !important;

    width: 100%;

    padding: 15px 10px;

    font-family: 'Source Sans Pro';

    form {
      color: #333333;

      width: 250px;
      height: 30px;

      font-weight: 700;

      display: flex;
      align-items: center;

      span {
        width: 100px;
      }

      input {
        width: 150px;
        height: 28px;
        font-size: 12px;

        display: flex;
        align-items: center;

        padding-left: 5px;

        background: #fdfdfd;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 3px;
      }

      & + form {
        margin-top: 15px;
      }
    }
  }
`;
