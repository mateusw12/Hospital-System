import { Component, OnDestroy, OnInit } from '@angular/core';
import { CovidNews } from '@module/models';
import { CovidNewsRepository } from '@module/repository';
import { untilDestroyed } from '@module/utils/common';
import { ErrorHandler } from '@module/utils/services';
import { getWebSiteNumber, webSiteDictionary } from '../web-site-news';

@Component({
  selector: 'app-covid-news',
  templateUrl: './covid-news.component.html',
})
export class CovidNewsComponent implements OnInit, OnDestroy {
  news: CovidNews = new CovidNews();

  constructor(
    private errorHandler: ErrorHandler,
    private covidNewsRepository: CovidNewsRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  getImageLInk(url: string): string {
    const webSite = getWebSiteNumber(url);
    return webSiteDictionary.hasOwnProperty(webSite)
      ? webSiteDictionary[webSite].img
      : '';
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.covidNewsRepository
      .findNews()
      .pipe(untilDestroyed(this))
      .subscribe(
        (covidNews) => {
          this.news = covidNews;
        },
        (error) => this.handleError(error)
      );
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }
}
