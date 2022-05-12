import { getAmountJackPot } from 'helpers';
import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import { useRetrieveJackPots } from 'services/jackpots';
import { COLORS } from 'styles/global-colors';
interface CurrentJackpotProps {
  gameId: string;
}
export function CurrentJackpot(props: CurrentJackpotProps) {
  const [amount, setAmount] = useState<number>(0);
  const { data } = useRetrieveJackPots(
    {},
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: 3000,
    },
  );
  useEffect(() => {
    const currentAmount = getAmountJackPot(props?.gameId, data?.data) || 0;
    setAmount(prev => prev + currentAmount);
  }, [data?.data]);

  return (
    <>
      {amount > 0 && (
        <Wrapper>
          <span className="amount-jackpot">${amount}</span>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0, 0.5);
  .amount-jackpot {
    color: ${COLORS.grey20};
    font-size: 11px;
    padding: 5px 10px;
    line-height: 1;
  }
`;