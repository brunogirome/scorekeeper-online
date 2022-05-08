import styled from 'styled-components';
import { shade } from 'polished';

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

export const Timer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 305px;

  margin: 10px 5px 5px 10px;

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 72px;
    line-height: 91px;

    color: #333333;

    padding: 0;

    text-align: center;

    span {
      font-size: 48px;
      margin-left: -10px;
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

    color: red;

    font-family: 'Source Sans Pro';

    p {
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

      & + p {
        margin-top: 15px;
      }
    }
  }
`;

export const PlayerTable = styled.div`
  margin: 0 5px 0 10px;
  padding: 0;

  height: 100%;

  table {
    padding: 0;
    margin: 0;

    width: 100%;

    border-collapse: collapse;

    tr:first-child {
      color: var(--gray-1);

      row-gap: 0;
      column-gap: 0;

      th:last-child {
        width: 100px;
      }

      th {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 10px;
        line-height: 14px;

        text-transform: uppercase;

        height: 24px;

        text-align: left;

        padding-left: 8px;
      }
    }

    div {
      background: rgba(102, 102, 102, 0.05);
      border: 1px dashed rgba(102, 102, 102, 0.12);
      border-radius: 3px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    tr + tr {
      height: 26px;

      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;

      color: #666666;

      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  }
`;

export const TourntamentInfo = styled.div`
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

export const TournamentBracket = styled.div`
  margin: 0 10px 0 0;

  table {
    border-collapse: collapse;

    row-gap: 0;
    column-gap: 0;

    font-family: 'Source Sans Pro';
    font-style: normal;
    color: var(--gray-1);
    font-weight: 700;

    width: 100%;

    text-transform: uppercase;
    td {
      padding: 1px;
    }

    thead {
      font-size: 14px;
      line-height: 18px;

      border-bottom: 1px solid rgba(0, 0, 0, 0.2);

      .last-row {
        display: flex;
        align-items: center;
        justify-content: end;

        button {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          font-size: 10px;
          line-height: 12px;
          color: #fdfdfd;

          margin-right: 10px;

          text-transform: uppercase;

          background: #4870d7;

          border: 0;
          padding: 0 16px;
          transition: background-color 0.2s;

          width: 85px;
          height: 24px;
          border-radius: 5px;

          &:hover {
            background: ${shade(0.2, '#4870d7')};
          }
        }
      }

      th {
        text-align: left;

        height: 35px;
      }
    }
    tbody {
      tr {
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }

        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        padding-bottom: 10px;

        .player-info {
          width: 175px;
        }

        input {
          height: 20px;
          font-size: 12px;

          display: flex;
          align-items: center;

          padding-left: 5px;

          background: #fdfdfd;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 3px;
        }

        input .player-name {
          width: 175px;
        }

        .table-number {
          width: 32px;
          font-size: 14px;
          line-height: 18px;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .vs-row {
          span {
            margin-top: 15px;
          }

          width: 30px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .player-score {
          padding-top: 3px;

          width: 42px;

          input {
            height: 40px;
            width: 40px;

            text-align: center;
            padding: 0;

            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
          }
        }

        .extra-info {
          input {
            width: 85px;
            height: 20px;
          }
        }

        p:first-child {
          padding-top: 5px;

          margin-bottom: 5px;
        }

        p + p {
          font-size: 10px;

          display: flex;
          justify-content: space-between;

          span {
            padding-left: 28px;
          }

          input {
            margin-left: 10px;
            width: 125px;
            height: 15px;

            font-size: 10px;
          }
        }
      }
    }
  }
`;
