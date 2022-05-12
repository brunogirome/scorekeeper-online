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
