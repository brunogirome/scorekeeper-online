import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  margin: 10px 10px 0 0;

  > div:first-child {
    padding: 15px 10px;

    display: flex;
    align-items: center;

    border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;

    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;

    input {
      margin-left: 10px;

      width: 430px;
      height: 28px;
      font-size: 12px;

      display: flex;
      align-items: center;

      padding-left: 5px;

      background: #fdfdfd;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 3px;
    }
  }

  > div + div {
    button {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #fdfdfd;

      display: flex;
      align-items: center;
      justify-content: center;

      text-transform: uppercase;

      background: #333333;

      border: 0;
      padding: 0 16px;
      transition: background-color 0.2s;

      border-radius: 5px;
    }

    color: #595959;

    display: flex;

    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;

    > div {
      padding: 15px 10px;

      border-right: 1px solid rgba(0, 0, 0, 0.15) !important;

      h3 {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;

        color: #404040;
        margin-bottom: 5px;
      }

      p {
        display: flex;
        justify-content: space-between;
      }

      p + p {
        margin-top: 7px;
      }
    }

    .generalInfo {
      p {
        width: 150px;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 15px;

        button {
          background-color: #664dca;

          width: 150px;

          height: 30px;

          font-size: 12px;

          x &:hover {
            background: ${shade(0.2, '#664dca')};
          }
        }
      }
    }

    .checkboxRow {
      p {
        width: 180px;
      }
    }

    & > div:last-child {
      width: 100%;
      display: flex;
      justify-content: end;
      align-items: end;

      border-right: none !important;

      button {
        width: 170px;
        height: 30px;
      }
    }
  }
`;
