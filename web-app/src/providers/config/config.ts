import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
  public Api: string;
  public URL: string;
  constructor(public http: HttpClient) {
    this.Api = 'http://localhost:5000/api/';//local
  }

}
