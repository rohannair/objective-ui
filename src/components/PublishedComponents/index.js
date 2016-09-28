import React from 'react';

import MapComp from './Map';
import Splash from './Splash';
import Tile from './Tile';

export const contentMap = new Map();
contentMap.set('splash', Splash);
contentMap.set('tiles', Tile);
contentMap.set('map', MapComp);
