import { JackPot } from 'app/models/jackPot';

export const getAmountJackPot = (
  gameId: string,
  jackpots: Array<JackPot> | undefined,
): number | undefined => {
  const currentJackpot = jackpots?.find(jackpot => jackpot.game === gameId);

  return currentJackpot?.amount;
};
