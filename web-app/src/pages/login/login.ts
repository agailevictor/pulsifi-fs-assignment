import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public inputEmail: any;
  public inputPassword: any;
  objrequest: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
  }

  handlelogin() {
    var self = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    self.objrequest = {};
    self.objrequest['email'] = self.inputEmail;
    self.objrequest['password'] = self.inputPassword;
    self.loginProvider.handlelogin(self.objrequest)
      .then(data => {
        loading.dismiss();
        if (data['result'].length > 0) {
          localStorage.setItem('userId', data['result'][0].id);
          self.navCtrl.setRoot(HomePage);
        } else {
          localStorage.setItem('userId', '0');
          const toast = self.toastCtrl.create({
            message: 'Inavlid Credentials',
            duration: 2000
          });
          toast.present();
        }
      })
      .catch(error => {
        loading.dismiss();
        localStorage.setItem('userId', '0');
        const toast = self.toastCtrl.create({
          message: error.error.error,
          duration: 2000
        });
        toast.present();
      });
  }
}
