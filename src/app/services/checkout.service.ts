import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { CheckinInsertReqDto } from "../dto/checkout/checkin-insert.req.dto";
import { CheckoutInsertReqDto } from "../dto/checkout/checkout-insert.req.dto";
import { CheckoutResDto } from "../dto/checkout/checkout.res.dto";
import { CheckoutDetailResDto } from "../dto/checkout/checkout-detail.res.dto";
import { CheckoutTypeResDto } from "../dto/checkout/checkout-type.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    constructor(private base: BaseService) { }

    insertCheckin(data: CheckinInsertReqDto): Observable<CheckinInsertReqDto> {
        return this.base.patch<CheckinInsertReqDto>('http://localhost:8080/checkouts', data, true)
    }

    insertCheckout(data: CheckoutInsertReqDto): Observable<CheckoutInsertReqDto> {
        return this.base.post<CheckoutInsertReqDto>('http://localhost:8080/checkouts', data, true)
    }

    getCheckout(): Observable<CheckoutResDto[]> {
        return this.base.get<CheckoutResDto[]>('http://localhost:8080/checkouts', true)
    }

    getCheckoutDetail(code: any): Observable<CheckoutDetailResDto[]> {
        return this.base.get<CheckoutDetailResDto[]>(`http://localhost:8080/checkouts/detail?code=${code}`, true)
    }

    getCheckoutType(): Observable<CheckoutTypeResDto[]> {
        return this.base.get<CheckoutTypeResDto[]>('http://localhost:8080/checkouttypes', true)
    }

    getAllCheckout(): Observable<CheckoutResDto[]> {
        return this.base.get<CheckoutResDto[]>('http://localhost:8080/checkouts/all', true)
    }

}