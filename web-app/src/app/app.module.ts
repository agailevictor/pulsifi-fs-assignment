import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { JobdetailsPage } from '../pages/jobdetails/jobdetails'
import { LoginPage } from '../pages/login/login';
import { RectuiterhomePage } from '../pages/rectuiterhome/rectuiterhome';
import { JobsPage } from '../pages/jobs/jobs';
import { ConfigProvider } from '../providers/config/config';
import { JobsProvider } from '../providers/jobs/jobs';
import { NgxPaginationModule } from "ngx-pagination";
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobdetailsPage,
    LoginPage,
    RectuiterhomePage,
    JobsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobdetailsPage,
    LoginPage,
    RectuiterhomePage,
    JobsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    JobsProvider,
    LoginProvider
  ]
})
export class AppModule { }
