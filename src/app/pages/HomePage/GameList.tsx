import { RIBBON_NEW_VALUE, RIBBON_TOP_VALUE } from 'app/constants';
import { Game } from 'app/models/game';
import { useGames } from 'contexts';
import { filterByCateName, filterByCateOther, getRibbonByCate } from 'helpers';
import qs from 'query-string';
import { useLocation } from 'react-router';
import { useRetrieveJackPots } from 'services/jackpots';
import styled from 'styled-components/macro';
import ribbonNew from './assets/new_ribbon.png';
import ribbonTop from './assets/top_ribbon.png';
import { CurrentJackpot } from './CurrentJackpot';

export function GameList() {
  const { games } = useGames();
  const location = useLocation();
  let newGames = Array<Game>();
  const query = qs.parse(location.search);
  const currentCate = query?.categories;
  if (currentCate !== 'other') {
    newGames = filterByCateName(games, query?.categories);
  } else {
    newGames = filterByCateOther(games);
  }
  if (!Boolean(query?.categories)) {
    newGames = games;
  }
  const renderRibbonImage = (game: Game): JSX.Element | null => {
    const currentRibbon = getRibbonByCate(game, currentCate);
    if (currentRibbon === RIBBON_NEW_VALUE) {
      return <Ribbon className="ribbon" src={ribbonNew} alt="new" />;
    }
    if (currentRibbon === RIBBON_TOP_VALUE) {
      return <Ribbon className="ribbon" src={ribbonTop} alt="top" />;
    }
    return null;
  };

  return (
    <div className="pure-g" style={{ marginTop: 30 }}>
      {newGames?.map((game: Game) => (
        <Card key={game?.id} className="pure-u-1-5 card">
          <img
            src={game?.image}
            alt={game.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          {renderRibbonImage(game)}
          <CardGroup className="cardGroup">
            <p>{game?.name}</p>
            <ButtonPlay>Play</ButtonPlay>
          </CardGroup>
          <CurrentJackpot gameId={game.id} />
        </Card>
      ))}
      {newGames?.length <= 0 && (
        <div className="pure-u-1-1">
          <p>No game found</p>
        </div>
      )}
    </div>
  );
}
const ButtonPlay = styled.button`
  background: linear-gradient(266.53deg, #3fc6c6 0%, #8dc63f 100%);
  border-radius: 8px;
  color: white;
  padding: 4px 18px;
  outline: none;
  border: none;
`;
const Ribbon = styled.img`
  position: absolute;
  right: 16px;
  width: 62px;
`;
const CardGroup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 100%;
  text-align: center;
  display: none;
`;

const Card = styled.div`
  overflow: hidden;
  transition: 0.3s;
  padding-right: 16px;
  padding-bottom: 30px;
  position: relative;
  &:hover {
    padding-right: 0px;
    cursor: pointer;
    transform: scale(1.5);
    z-index: 99;

    &::before {
      overflow: hidden;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: black;
      opacity: 0.5;
      border-radius: 8px;
      height: 82%;
    }
    .cardGroup {
      display: block;
    }
    .ribbon {
      right: 0;
    }
  }
`;
