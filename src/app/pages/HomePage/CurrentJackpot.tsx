import { getAmountJackPot } from 'helpers';
import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import { useRetrieveJackPots } from 'services/jackpots';

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
          <Overlay className="overlay-jackpot"></Overlay>
          <Amount className="amount-jackpot">{amount}</Amount>
        </Wrapper>
      )}
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  background: black;
  opacity: 0.5;
  width: 93%;
  left: 0;
  text-align: center;
  height: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const Amount = styled.span`
  position: absolute;
  bottom: 0;
  color: white;
`;
