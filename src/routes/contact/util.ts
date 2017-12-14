import * as moment from 'moment';
import { random } from 'faker';
const { number } = random;

export const todayStart =
  moment()
    .startOf('day')
    .unix() * 1000;
const now = moment().unix() * 1000;

export const getRandomNumberBetween = (min: number, max: number): number =>
  number({ min, max });
