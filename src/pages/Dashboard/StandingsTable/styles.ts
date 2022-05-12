import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
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
          display: flex;
          align-items: center;

          input,
          button {
            margin-left: 5px;
            width: 25px;
            height: 25px;

            display: flex;
            align-items: center;
            justify-content: center;
          }

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
