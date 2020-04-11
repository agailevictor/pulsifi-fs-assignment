import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
  public Api: string;
  public URL: string;
  constructor(public http: HttpClient) {
    this.Api = 'http://localhost:3000/';//local
    // this.Api = 'http://ec2-18-222-216-219.us-east-2.compute.amazonaws.com:3000/'; //dev
  }

}
