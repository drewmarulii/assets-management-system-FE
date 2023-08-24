import { CheckoutDetailInsertReqDto } from "./checkout-detail-insert.req.dto"

export interface CheckoutInsertReqDto {
    employeeId? : number
    locationId? : number
    assetGeneralId? : number 
    typeId : number
    details : CheckoutDetailInsertReqDto[]
}