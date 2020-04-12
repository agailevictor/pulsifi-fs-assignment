import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { JobdetailsPage } from '../../pages/jobdetails/jobdetails';
import { LoginPage } from '../../pages/login/login';
import { JobsPage } from '../../pages/jobs/jobs';

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
  public userId: any = 0;
  public rPage: any = 'LoginPage';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jobsApi: JobsProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    let myItem = localStorage.getItem('userId');
    this.handlechecksession(myItem);
  }

  handlechecksession(metaData) {
    console.log(metaData);
    if (metaData && parseInt(metaData) != 0) {
      this.rUser = true;
      this.userId = parseInt(metaData);
    } else {
      this.rUser = false;
      this.userId = 0;
    }
    this.handlegetAllJobList();
  }

  handlegetAllJobList() {
    var self = this;
    let loading = self.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    self.jobsApi.handlelistalljobs(self.p, self.userId)
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
    if (parseInt(self.userId) == 0) {
      self.rPage = LoginPage;
    } else {
      self.rPage = JobsPage;
    }
    try {
      let modal = self.modalCtrl.create(self.rPage, {});
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
    self.userId = 0;
    self.p = 1;
    self.handlegetAllJobList();
  }

}
