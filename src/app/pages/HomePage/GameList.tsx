import * as React from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router';
import styled from 'styled-components/macro';
import { filterByCateName, filterByCateOther, getRibbonByCate } from 'helpers';
import { RIBBON_NEW_VALUE, RIBBON_TOP_VALUE } from 'app/constants';
import { Game } from 'app/models/game';
import { useGames } from 'contexts';
import ribbonNew from './assets/new_ribbon.png';
import ribbonTop from './assets/top_ribbon.png';
import { CurrentJackpot } from './CurrentJackpot';
import { COLORS } from 'styles/global-colors';

export function GameList() {
  const { games } = useGames();
  const location = useLocation();
  let _Games = Array<Game>();
  const query = qs.parse(location.search);
  const currentCate = query?.categories;
  
  if (currentCate !== 'other') {
    _Games = filterByCateName(games, query?.categories);
  } else {
    _Games = filterByCateOther(games);
  }
  if (!Boolean(query?.categories)) {
    _Games = games;
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
        {_Games?.map((game: Game) => (
          <div key={game?.id} className="cell-20 game-item">
            <Card className="card">
              <img src={game?.image} alt={game.name} className="game-pic" />
              {renderRibbonImage(game)}
              <CurrentJackpot gameId={game.id} />
              <div className="display-card-group m-aligner">
                <div>
                  <p className="g-name">{game?.name}</p>
                  <ButtonPlay>Play</ButtonPlay>
                </div>
              </div>
            </Card>
          </div>
        ))}
        {_Games?.length <= 0 && (
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

const ButtonPlay = styled.span`
  background: linear-gradient(266.53deg, #3fc6c6 0%, #8dc63f 100%);
  border-radius: 6px;
  color: ${COLORS.white};
  padding: 5px 15px;
  font-size: 14px;
  line-height: 1;
  outline: none;
  border: none;
  display: inline-block;
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

const Card = styled.a`
  display: block;
  transition: transform 0.25s ease-out;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  height: 100%;
  &:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    z-index: 2;
    .display-card-group {
      opacity: 1;
      pointer-events: auto;
      z-index: 3;
    }
    @media (max-width: 1024px) {
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
      .display-card-group {
        opacity: 0;
        pointer-events: none;
        z-index: -1;
      }
    }
  }
  img.game-pic {
    width: 100%;
    height: auto;
    z-index: 1;
  }
  .display-card-group {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 4;
    background-color: rgba(0,0,0, 0.5);
    text-align: center;

    transition: all 0.25s ease-out;
    opacity: 0;
    pointer-events: none;
    z-index: -1;

    .g-name {
      color: ${COLORS.white};
      margin: 0;
      margin-bottom: 10px;
      text-shadow: 1px 1px 2px rgba(0,0,0, 0.6);
    }
  }
`;
