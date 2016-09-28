import React from 'react';
import styles from './Tile.css';

import Card from 'components/Card';
import { compose, map } from 'ramda';

const TileComp = (c) => <div className={ styles.container }>{c}</div>;

const Tile = map(val => {
  const Inner = (
    <div>
      <img src={ val.img } />
      <h2 className={ styles.heading }>{ val.name }</h2>
      <div className={ styles.message }>
        { val.message }
      </div>
    </div>
  );

  return (
    <div className={ styles.tile } key={ val.id }>
      { Card(Inner) }
    </div>
  );
});

export default compose(TileComp, Tile);
