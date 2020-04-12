import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { JobsProvider } from '../../providers/jobs/jobs';
import { JobdetailsPage } from '../../pages/jobdetails/jobdetails';
import { JobsPage } from '../../pages/jobs/jobs';

@Component({
  selector: 'page-rectuiterhome',
  templateUrl: 'rectuiterhome.html',
})
export class RectuiterhomePage {

  public jobdata: any[];
  public p = 1;
  public maxPage: any;
  public perPage: any;
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
      let modal = self.modalCtrl.create(JobsPage, {});
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
}
