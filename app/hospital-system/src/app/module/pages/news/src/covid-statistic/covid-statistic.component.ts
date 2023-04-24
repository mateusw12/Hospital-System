import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { StatisticResponse } from '@module/models';
import { CovidStatisticsRepository } from '@module/repository';
import { untilDestroyed } from '@module/utils/common';
import { search } from '@module/utils/functions/string';
import { ErrorHandler } from '@module/utils/services';
import { DataLabel, Maps, MapsTooltip } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

Maps.Inject(MapsTooltip, DataLabel);
@Component({
  selector: 'app-covid-statistic',
  templateUrl: './covid-statistic.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CovidStatisticComponent implements OnInit, OnDestroy {
  statisticsResponse: StatisticResponse[] = [];
  statisticCountry: StatisticResponse | undefined = undefined;

  shapeData!: object;
  shapeSettings!: object;
  tooltipSettings!: object;
  dataLabelSettings!: Object;

  constructor(
    private errorHandler: ErrorHandler,
    private covidStatisticsRepository: CovidStatisticsRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.loadMap();
  }

  onSelectCountry(event: any): void {
    const countryName = event.shapeData.name as string;
    const statisticCountry = this.statisticsResponse.find((el) =>
      search(el.country, countryName)
    );
    this.statisticCountry = statisticCountry ? statisticCountry : undefined;
    console.log('onSelectCountry', statisticCountry);
  }

  getFormatNumber(number: number | null): string {
    if (!number) return '0';
    return number.toLocaleString('pt-BR');
  }

  ngOnDestroy(): void {}

  private loadMap(): void {
    this.shapeData = world_map;
    this.shapeSettings = {
      autofill: true,
    };
    this.dataLabelSettings = {
      visible: true,
      labelPath: 'name',
      smartLabelMode: 'Trim',
    };
    this.tooltipSettings = {
      visible: true,
      valuePath: 'name',
    };
  }

  private loadData(): void {
    this.covidStatisticsRepository
      .findStatistics()
      .pipe(untilDestroyed(this))
      .subscribe(
        (statistics) => {
          this.statisticsResponse = statistics.response;
        },
        (error) => this.handleError(error)
      );
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }
}
