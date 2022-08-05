import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { DecodeService } from '../login/service/decode.service';
import { BasketModel } from './model/basket-model';
import { BasketService } from './service/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  baskets: BasketModel[] = [];

  customerId: number = 0;

  total: number = 0;

  constructor(
    private basketService: BasketService,
    private errorSevice: ErrorService,
    private toastrService: ToastrService,
    private decodeService: DecodeService
  ) {}

  ngOnInit(): void {
    this.getCustomerId();
  }

  getCustomerId() {
    this.customerId = this.decodeService.getCustomerId();
    this.getList();
  }

  getList() {
    this.basketService.getList(this.customerId).subscribe(
      (res: any) => {
        this.baskets = res.data;
        this.setTotal();
      },
      (err) => {
        this.errorSevice.errorHandler(err);
      }
    );
  }
  setTotal() {
    this.total = 0;
    this.baskets.forEach((p) => {
      this.total = this.total + p.total;
    });
  }
}
