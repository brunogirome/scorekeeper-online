import styled from 'styled-components';
import { shade, darken, lighten } from 'polished';

export const Container = styled.form`
  color: #333;
  font-family: 'Source Sans Pro';

  h1 {
    font-size: 16px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  h2 {
    border-top: 1px solid ${darken(0.05, '#e5e5e5')};
    padding-top: 10px;

    color: #222;
    font-size: 14px;

    margin-bottom: 10px;
  }

  div + h2 {
    margin-top: 15px;
  }

  div > input {
    width: 200px;
    height: 28px;
    font-size: 12px;

    display: flex;
    align-items: center;

    padding-left: 10px;

    background: #fdfdfd;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }
`;

export const PlayerSelector = styled.div`
  width: 100%;

  table {
    font-size: 12px;

    row-gap: 0;
    column-gap: 0;

    border-collapse: collapse;

    overflow: hidden;

    border: 1px solid #666;

    thead {
      display: block;

      th {
        width: 120px;
        padding: 2px 10px;
        border-right: 1px solid #666;
        border-bottom: 1px solid #666;
      }

      color: #333;
    }

    tbody {
      background: #fdfdfa;

      display: block;
      height: 100px;

      overflow-y: scroll;

      tr {
        td {
          width: 120px;
          padding-left: 8px;
          height: 25px;
        }

        transition: background-color 0.3s;

        &:hover {
          background: ${shade(0.1, '#fdfdfa')};
        }
      }
    }
  }

  > div {
    margin-top: 10px;
    width: 500px;

    display: flex;
    justify-content: space-between;

    font-family: 'Source Sans Pro';
    font-style: normal;
    color: var(--gray-1);
    font-weight: 700;
  }
`;

export const PlayersDecks = styled.div`
  width: 500px;

  font-family: 'Source Sans Pro';
  font-style: normal;
  color: var(--gray-1);
  font-weight: 700;

  display: flex;
  justify-content: space-between;

  span {
    font-size: 12px;
  }
`;

export const PlayersScores = styled.div`
  width: 100%;

  font-family: 'Source Sans Pro';
  font-style: normal;
  color: var(--gray-1);
  font-weight: 700;

  display: flex;
  justify-content: space-between;

  span {
    font-size: 12px;
    margin-bottom: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  div div {
    justify-content: space-around;
    width: 220px;
    flex-direction: row;
  }

  div div div {
    font-size: 14px;

    align-items: center;

    input {
      margin-left: 5px;
      width: 40px;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 15px;
  padding-top: 15px;

  border-top: 1px solid ${darken(0.05, '#e5e5e5')};

  display: flex;
  justify-content: space-between;

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

    border: 0;
    padding: 0 16px;
    transition: background-color 0.2s;

    border-radius: 5px;

    height: 35px;
  }

  button + button {
    background: #4870d7;
  }

  button:first-child {
    background-color: none;
    border: 1px solid #333333;
    color: #333333;

    &:hover {
      border-color: ${lighten(0.1, '#333333')};
      color: ${lighten(0.1, '#333333')};
      background: none;
    }
  }
`;
