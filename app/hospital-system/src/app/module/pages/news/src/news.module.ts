import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCardModule } from '@module/shared';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CovidNewsComponent } from './covid-news/covid-news.component';
import { NewsRoutingModule } from './news-routing.module';
import { News } from './news.component';

@NgModule({
  declarations: [News, CovidNewsComponent],
  imports: [CommonModule, TabModule, AppCardModule, NewsRoutingModule],
})
export class NewsModule {}
