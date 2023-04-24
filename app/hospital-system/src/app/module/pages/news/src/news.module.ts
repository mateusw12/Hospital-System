import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCardModule } from '@module/shared';
import {
  AnnotationsService,
  BubbleService,
  DataLabelService,
  LegendService,
  MapsModule,
  MapsTooltipService,
  MarkerService,
  NavigationLineService,
  SelectionService,
  ZoomService,
} from '@syncfusion/ej2-angular-maps';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CovidNewsComponent } from './covid-news/covid-news.component';
import { CovidStatisticComponent } from './covid-statistic/covid-statistic.component';
import { NewsRoutingModule } from './news-routing.module';
import { News } from './news.component';

@NgModule({
  declarations: [News, CovidNewsComponent, CovidStatisticComponent],
  imports: [
    CommonModule,
    TabModule,
    AppCardModule,
    MapsModule,
    NewsRoutingModule,
  ],
  providers: [
    LegendService,
    MarkerService,
    MapsTooltipService,
    DataLabelService,
    BubbleService,
    NavigationLineService,
    SelectionService,
    AnnotationsService,
    ZoomService,
  ],
})
export class NewsModule {}
