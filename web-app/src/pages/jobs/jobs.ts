import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as $ from 'jquery'

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {
  public fileName: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobsPage');
  }

  onBrowseClick($e) {
    var self = this;
    let loading = self.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    $e.preventDefault();
    $('#jd').click();
    loading.dismiss();
  }

  onFileSelected() {
    var self = this;
    var d = $("#jd").val().toString().split('\\');
    self.fileName = d[d.length - 1];
  }
}
