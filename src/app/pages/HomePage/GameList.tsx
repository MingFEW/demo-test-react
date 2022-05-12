import { RIBBON_NEW_VALUE, RIBBON_TOP_VALUE } from 'app/constants';
import { Game } from 'app/models/game';
import { useGames } from 'contexts';
import { filterByCateName, filterByCateOther, getRibbonByCate } from 'helpers';
import qs from 'query-string';
import { useLocation } from 'react-router';
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
      return <Ribbon className="ribbon" imgUrl={ribbonNew} />;
    }
    if (currentRibbon === RIBBON_TOP_VALUE) {
      return <Ribbon className="ribbon" imgUrl={ribbonTop} />;
    }
    return null;
  };

  return (
    <Container>
      {newGames?.map((game: Game) => (
        <Card key={game?.id} className="card">
          <img src={game?.image} alt={game.name} className="game-pic" />
          {renderRibbonImage(game)}
          <CardGroup className="display-card-group">
            <p>{game?.name}</p>
            <ButtonPlay>Play</ButtonPlay>
          </CardGroup>
          <Overlay className="overlay display-card-group"></Overlay>
          <CurrentJackpot gameId={game.id} />
        </Card>
      ))}
      {newGames?.length <= 0 && (
        <div className="pure-u-1-1">
          <p>No game found</p>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const ButtonPlay = styled.button`
  background: linear-gradient(266.53deg, #3fc6c6 0%, #8dc63f 100%);
  border-radius: 8px;
  color: white;
  padding: 4px 18px;
  outline: none;
  border: none;
`;
const Ribbon = styled.span<{ imgUrl: string }>`
  position: absolute;
  right: 8px;
  width: 72px;
  height: 72px;
  background: ${props =>
    `url(${props?.imgUrl && props?.imgUrl}) no-repeat top center`};
  background-size: 56px;
`;
const CardGroup = styled.div`
  width: calc(100% - 16px);
  height: calc(100% - 30px);
  flex-direction: column;
  position: absolute;
  top: 0;
  z-index: 3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  visibility: hidden;
`;
const Overlay = styled.div`
  height: 100%;
  width: calc(100% - 16px);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.4;
  border-radius: 8px;
  color: white;
  visibility: hidden;
`;

const Card = styled.a`
  width: 20%;
  margin-top: 30px;
  transform 0.25s ease-out;
  padding-right: 16px;
  position: relative;
  &:hover {
    padding-right: 0px;
    cursor: pointer;
    -webkit-transform: scale(1.02);
    -ms-transform: scale(1.02);
    transform: scale(1.02);
    z-index: 2;
    .display-card-group {
      visibility: visible;
      width: 100%;
    }
    .ribbon {
      right: -8px;
    }
    .overlay-jackpot {
      display: none;
    }
  }
  img.game-pic {
    width: 100%;
    height: auto;
    border-radius: 8px
  }
`;
