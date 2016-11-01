import { map } from 'ramda';
import upperFirst from 'lodash/upperFirst';
const SPLIT_REGEX = /\s/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const formatTitle = (str, re) =>
  map(upperFirst)(str.split(re))
    .join(' ');

export const validateEmail = (str) =>
  EMAIL_REGEX.test(str);
