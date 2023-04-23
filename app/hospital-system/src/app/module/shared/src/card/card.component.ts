import { Component, Input, OnInit } from '@angular/core';
import { goToUrl } from '@module/utils/functions';
import { ToastService } from '@module/utils/services';

@Component({
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  selector: 'app-card',
})
export class CardComponent implements OnInit {
  private readonly timeOut: number = 1500;

  constructor(private toastService: ToastService) {}

  @Input()
  title: string = '';

  @Input()
  country: string = '';

  @Input()
  body: string = '';

  @Input()
  author: string = 'Não Definido';

  @Input()
  publishDate: string = '';

  @Input()
  imgLink: string = '';

  @Input()
  newsLink: string = '';

  ngOnInit(): void {}

  onReadClick(): void {
    if (!this.newsLink) {
      this.onReadBlocked();
      return;
    }
    goToUrl(this.newsLink);
  }

  private onReadBlocked(): void {
    this.toastService.showInfo(
      'Link da noíticia está indisponível!',
      undefined,
      this.timeOut
    );
  }
}
