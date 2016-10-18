import { map } from 'ramda';
import upperFirst from 'lodash/upperFirst';
const SPLIT_REGEX = /\s/;

export const formatTitle = (str, re) =>
  map(upperFirst)(str.split(re))
    .join(' ');

