import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { JobdetailsPage } from '../../pages/jobdetails/jobdetails';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public jobdata: any[];
  public p = 1;
  public maxPage: any;
  public perPage: any;
  public rUser: any = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jobsApi: JobsProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.handlegetAllJobList();
    let myItem = localStorage.getItem('isGuest');
    this.handlechecksession(myItem);
  }

  handlechecksession(metaData) {
    if (metaData == 'false') {
      this.rUser = true;
    }
  }

  handlegetAllJobList() {
    var self = this;
    let loading = self.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    self.jobsApi.handlelistalljobs(self.p)
      .then(resp => {
        loading.dismiss();
        self.jobdata = resp['data'];
        self.maxPage = resp['total']
        self.perPage = resp['per_page']
      });
  }

  handleviewdetails(item) {
    var self = this;
    try {
      let modal = self.modalCtrl.create(JobdetailsPage, { "item": item }, { enableBackdropDismiss: false });
      modal.present();
      modal.onDidDismiss(data => {
        if (data) {
          self.handlegetAllJobList();
        }
      });
    } catch (e) {
      console.log("Exception in handleviewdetails: " + e);
    }
  }

  handlepostjob() {
    var self = this;
    try {
      let modal = self.modalCtrl.create(LoginPage, {});
      modal.present();
      modal.onDidDismiss(data => {
        if (data) {
          self.handlegetAllJobList();
        }
      });
    } catch (e) {
      console.log("Exception in handlepostjob: " + e);
    }
  }

  pageChanged(data) {
    var self = this;
    self.p = data;
    self.handlegetAllJobList();
  }

  handlelogout() {
    localStorage.clear();
    var self = this;
    self.rUser = false;
    self.p = 1;
    self.handlegetAllJobList();
  }

}
