import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { JobdetailsPage } from '../pages/jobdetails/jobdetails'
import { ConfigProvider } from '../providers/config/config';
import { JobsProvider } from '../providers/jobs/jobs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobdetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    JobsProvider
  ]
})
export class AppModule { }
