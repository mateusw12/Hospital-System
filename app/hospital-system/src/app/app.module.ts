import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MenuComponent } from '@module/pages/menu';
import {
  AuthGuardsService,
  HttpErrorHandlerInterceptor,
} from '@module/utils/http';
import { FormsModule } from '@angular/forms';
import { BreadCrumbComponent, ButtonAppModule, DropDownListModule } from '@module/shared';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [AppComponent, MenuComponent, BreadCrumbComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DropDownListModule,
    AppBarModule,
    ButtonModule,
    FormsModule,
    ButtonAppModule,
  ],
  providers: [
    BsModalService,
    AuthGuardsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
