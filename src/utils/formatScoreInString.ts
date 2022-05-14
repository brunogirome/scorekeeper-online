import { Player } from '../Hooks/playerContext';

interface Props {
  player: Player;
}

export function formatScoreInString({ player }: Props): string {
  const { wins, draws, looses } = player;

  return `V${wins} - D${draws} - L${looses}`;
}
