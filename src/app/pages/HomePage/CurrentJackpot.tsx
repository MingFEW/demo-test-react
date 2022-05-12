import { getAmountJackPot } from 'helpers';
import usePrevious from 'hooks/usePrevious';
import { useEffect, useState } from 'react';
import { useRetrieveJackPots } from 'services/jackpots';

interface CurrentJackpotProps {
  gameId: string;
}
export function CurrentJackpot(props: CurrentJackpotProps) {
  console.log(props);
  const [amount, setAmount] = useState<number>(0);
  const { data } = useRetrieveJackPots(
    {},
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 3000,
    },
  );
  const prevAmount = usePrevious(amount);
  useEffect(() => {
    const currentAmount = getAmountJackPot(props?.gameId, data?.data);
    if (prevAmount !== currentAmount) {
      setAmount(currentAmount | 0);
    }
  }, [data?.data]);

  return <>{<span>{amount}</span>}</>;
}
