import * as React from 'react';
import { createContext, useContext, ReactNode } from 'react';
import { Game } from 'app/models/game';
import { useRetrieveGames } from 'services/game';

interface GameContextProviderProps {
  children: ReactNode;
}
interface IGameContext {
  games: Game[];
}

const GameContext = createContext<IGameContext>({
  games: [],
});

export const GameProvider: React.FC<GameContextProviderProps> = ({
  children,
}: GameContextProviderProps) => {
  const { data } = useRetrieveGames(
    {},
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <GameContext.Provider
      value={{
        games: data?.data || [],
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => useContext(GameContext);
