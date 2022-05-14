import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 0 5px 0 10px;
  padding: 0;

  height: 100%;

  overflow-y: scroll;

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

    button {
      background: rgba(102, 102, 102, 0.05);
      border: 1px dashed rgba(102, 102, 102, 0.12);
      border-radius: 3px;

      display: flex;
      justify-content: center;
      align-items: center;

      color: rgba(0, 0, 0, 0.15);

      height: 25px;
      width: 100%;

      transition: background-color 0.15s;

      &:hover {
        background: ${darken(0.6, 'rgba(102, 102, 102, 0.05)')};
      }
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

      td:first-child {
        padding-left: 10px;
      }
    }
  }
`;
