import styled from 'styled-components';

export const Container = styled.div`
  width: 1280px;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    margin: 35px auto 10px auto;
    text-align: center;

    width: 250px;

    font-family: 'Open Sans', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--gray-1);
  }

  > div {
    display: flex;
    justify-content: space-between;
  }
`;

export const PlayerCard = styled.div<{ side: string }>`
  width: 500px;
  height: 80px;

  justify-content: ${props =>
    props.side === 'right' ? 'flex-start' : 'flex-end'};

  border-radius: 12px;
  background: linear-gradient(180deg, #666666 0%, #333333 100%);

  margin-top: 30px;

  display: flex;
`;

export const PlayerText = styled.div<{ side: string }>`
  margin-left: ${props => (props.side === 'left' ? '0' : '24px')};
  margin-right: ${props => (props.side === 'left' ? '24px' : '0')};

  margin-top: 14px;

  color: #e1e1e1;
  text-transform: uppercase;
  font-size: 20px;

  font-family: 'Source Sans Pro', sans-serif;

  text-justify: right;

  display: flex;
  flex-direction: column;

  p {
    font-size: 20px;
    font-weight: 600;

    color: #e9e9e9;

    span {
      margin-right: 2px;

      text-transform: none;

      font-size: 16px;
      font-weight: 400;

      color: #c1c1c1;
    }
  }

  > span {
    margin-left: ${props => (props.side === 'right' ? '0' : 'auto')};
    margin-right: ${props => (props.side === 'right' ? 'auto' : '0')};
  }
`;

export const Score = styled.div<{ side: string }>`
  width: 65px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Open Sans', sans-serif;

  background: linear-gradient(
      180deg,
      rgba(220, 227, 91, 0.66) 0%,
      rgba(69, 182, 73, 0.66) 100%
    ),
    #fafafa;
  border: 1px solid #666666;

  color: #666666;
  font-size: 28px;
  line-height: 38px;
  font-weight: 700;

  border-radius: ${props =>
    props.side === 'right' ? '12px 0px 0px 12px' : '0px 12px 12px 0px'};
`;

export const Tables = styled.div`
  div {
    font-family: 'Open Sans', sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: var(--gray-1);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 80px;
    width: 250px;

    margin-top: 30px;

    span {
      margin-top: auto;
      font-family: 'Digital Numbers';

      background: linear-gradient(180deg, #cbcbcb 0%, #919191 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;

      font-size: 18px;
    }
  }
`;
