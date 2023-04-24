import { StatisticCase } from './statistic-case';
import { StatisticDeaths } from './statistics-deaths';
import { StatisticTests } from './statistics-tests';

export class StatisticResponse {
  continent: string = '';
  country: string = '';
  day: Date = new Date();
  population: number = 0;
  time: Date = new Date();
  cases: StatisticCase = new StatisticCase();
  deaths: StatisticDeaths = new StatisticDeaths();
  tests: StatisticTests = new StatisticTests();
}
