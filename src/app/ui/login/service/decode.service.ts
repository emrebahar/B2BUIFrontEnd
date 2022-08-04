import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class DecodeService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor() {}

  getCustomerId(): number {
    let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    var customerId = Object.keys(decode).filter((p) =>
      p.endsWith('/nameidentifier')
    )[0];
    return +decode[customerId];
  }
  getCustomerName(): string {
    let decode = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    var userName = Object.keys(decode).filter((p) => p.endsWith('/name'))[0];
    return decode[userName];
  }
}
