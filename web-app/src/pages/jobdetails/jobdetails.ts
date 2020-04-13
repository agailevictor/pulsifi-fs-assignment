import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { saveAs } from 'file-saver';

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
  jobDesc: any;
  jdLink: any = 'http://35.232.186.61/files/';
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
      this.jobDate = this.jobDeatilsObject.modified_at;
      this.jobStatus = this.jobDeatilsObject.job_status;
      this.jobDesc = this.jobDeatilsObject.jd_file_name;
    }
  }


  handlecancel() {
    this.viewCtrl.dismiss("success");
  }

  handleDownload() {
    console.log(this.jdLink + this.jobDesc);
    saveAs(this.jdLink + this.jobDesc);
  }
}
