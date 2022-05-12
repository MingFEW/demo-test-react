import { JackPot } from 'app/models/jackPot';

export const getAmountJackPot = (
  gameId: string,
  jackpots: Array<JackPot> | undefined,
): number => {
  const currentJackpot = jackpots?.find(jackpot => jackpot.game === gameId);

  return currentJackpot?.amount || 0;
  // const filteredJackpots = jackpots?.filter(jackpot => jackpot.game === gameId);
  // console.log(filteredJackpots);
  // return filteredJackpots
};
