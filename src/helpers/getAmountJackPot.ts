import { JackPot } from 'app/models/JackPot';

export const getAmountJackPot = (
  gameId: string,
  jackpots: Array<JackPot> | undefined,
): number => {
  const currentJackpot = jackpots?.find(jackpot => jackpot.game === gameId);

  return currentJackpot?.amount || 0;
};
