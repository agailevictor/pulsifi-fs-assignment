import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RectuiterhomePage } from '../../pages/rectuiterhome/rectuiterhome';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  inputEmail;
  inputPassword;
  objrequest;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  handlelogin() {
    this.navCtrl.setRoot(RectuiterhomePage);
  }

}
