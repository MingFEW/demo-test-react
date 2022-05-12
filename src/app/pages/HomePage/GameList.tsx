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
    <Container className="container">
      <div className="row">
        {newGames?.map((game: Game) => (
          <div className="cell-20 game-item">
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
          </div>
        ))}
        {newGames?.length <= 0 && (
          <div className="pure-u-1-1">
            <h4>No game found</h4>
          </div>
        )}
      </div>
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
  border-radius: 6px;
  color: white;
  padding: 4px 18px;
  outline: none;
  border: none;
`;

const Ribbon = styled.span<{ imgUrl: string }>`
  position: absolute;
  right: 0;
  top: 0;
  width: 60px;
  height: 60px;
  background: ${props =>
    `url(${props?.imgUrl && props?.imgUrl}) no-repeat top right`};
  background-size: 60px;
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
  display: block;
  transition: transform 0.25s ease-out;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    z-index: 2;
  }
  img.game-pic {
    width: 100%;
    height: auto;
  }
`;
