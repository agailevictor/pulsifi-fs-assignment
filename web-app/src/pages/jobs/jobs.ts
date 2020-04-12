import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as $ from 'jquery';
import { JobsProvider } from '../../providers/jobs/jobs';

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {

  formgroup: FormGroup;
  jobTitle: AbstractControl;
  jobLocation: AbstractControl;
  jobStatus: AbstractControl;

  public fileName: string = '';
  // public jobTitle: any;
  // public jobLocation: any;
  // public jobStatus: any;
  public objrequest: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public jobsApi: JobsProvider,
    public formbuilder: FormBuilder
  ) {
    this.formgroup = formbuilder.group({
      jobTitle: ['', [Validators.required]],
      jobLocation: ['', [Validators.required]],
      jobStatus: ['', [Validators.required]]
    });

    this.jobTitle = this.formgroup.controls['jobTitle'];
    this.jobLocation = this.formgroup.controls['jobLocation'];
    this.jobStatus = this.formgroup.controls['jobStatus'];
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

  handlePostJob(formgroup) {
    var self = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    self.objrequest = {};
    self.objrequest['job_title'] = formgroup.jobTitle;
    self.objrequest['job_location'] = formgroup.jobLocation;
    self.objrequest['jd_file_name'] = self.fileName;
    self.objrequest['job_status'] = formgroup.jobStatus;
    self.objrequest['created_by'] = 8;
    self.objrequest['modified_by'] = 8;
    self.jobsApi.handlecreateJob(self.objrequest)
      .then(data => {
        loading.dismiss();
        self.viewCtrl.dismiss("success");
      })
      .catch(error => {
        loading.dismiss();
      });
  }

  handleCancel() {
    this.viewCtrl.dismiss("success");
  }

}
