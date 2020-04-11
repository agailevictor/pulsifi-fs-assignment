import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-jobdetails',
  templateUrl: 'jobdetails.html',
})
export class JobdetailsPage {
  jobDeatilsObject = null;
  jobTitle: any;
  jobLocation: any;
  jobDate: any;
  jobStatus: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  ionViewDidLoad() {
    if (this.navParams.get("item")) {
      this.jobDeatilsObject = this.navParams.get("item");
      this.jobTitle = this.jobDeatilsObject.job_title;
      this.jobLocation = this.jobDeatilsObject.job_location;
      this.jobDate = this.jobDeatilsObject.posted_date;
      this.jobStatus = this.jobDeatilsObject.job_status;
    }
  }


  handlecancel() {
    this.viewCtrl.dismiss("success");
  }
}
