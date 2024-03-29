import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class JobsProvider {
  public apiUrl: string;
  public dummyData: any;
  constructor(
    public http: HttpClient,
    public configs: ConfigProvider
  ) {
    this.apiUrl = configs.Api;
  }

  handlelistalljobs(Query1, Query2) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'listalljobs?page=' + Query1 + '&userId=' + Query2)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  handlecreateJob(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'postjob', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
