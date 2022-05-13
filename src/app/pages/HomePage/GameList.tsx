import * as React from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router';
import styled from 'styled-components/macro';

import { Game } from 'app/models/game';
import { useGames } from 'contexts';
import { filterByCateName, filterByCateOther } from 'helpers';
import { CardGame } from 'app/components';

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

  return (
    <Container className="container">
      <div className="row">
        {_Games?.map((game: Game) => (
          <CardGame game={game} />
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
