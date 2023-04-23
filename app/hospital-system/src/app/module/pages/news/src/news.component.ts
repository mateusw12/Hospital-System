import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class News implements AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
}
