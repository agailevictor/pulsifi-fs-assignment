import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class JobsProvider {
  public apiUrl: string;
  constructor(
    public http: HttpClient,
    public configs: ConfigProvider
  ) {
    this.apiUrl = configs.Api;
  }

  handlelistalljobs(Query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'users?page=' + Query)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
