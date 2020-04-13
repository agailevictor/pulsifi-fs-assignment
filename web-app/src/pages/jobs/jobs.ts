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
  jobDescription: AbstractControl;

  public fileName: string = '';
  // public jobTitle: any;
  // public jobLocation: any;
  // public jobStatus: any;
  public objrequest: any;
  public fileData = null;
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
      jobStatus: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]]
    });

    this.jobTitle = this.formgroup.controls['jobTitle'];
    this.jobLocation = this.formgroup.controls['jobLocation'];
    this.jobStatus = this.formgroup.controls['jobStatus'];
    this.jobDescription = this.formgroup.controls['jobDescription'];
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
    var elementvalue = $("#jd").val().toString().split('\\');
    self.fileName = elementvalue[elementvalue.length - 1];
    var fileList = ($("#jd")[0] as HTMLInputElement).files;
    var fileReader = new FileReader();
    if (fileReader && fileList && fileList.length) {
      fileReader.readAsDataURL(fileList[0]);
      fileReader.onload = function () {
        // console.log('======== KB ====', Math.round((((fileReader.result as string).split(',')[1].length) * 3 / 4) / 1024))
        self.fileData = (fileReader.result as string).split(',')[1];
        // console.log('fileData :', self.fileData);
      };
    }
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
    self.objrequest['job_description'] = self.fileData;
    self.objrequest['created_by'] = localStorage.getItem('userId');
    self.objrequest['modified_by'] = localStorage.getItem('userId');
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
