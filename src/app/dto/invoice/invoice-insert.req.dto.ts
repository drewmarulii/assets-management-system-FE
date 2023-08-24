import { InvoiceDetailInsertReqDto } from "../invoice-detail/invoice-detail-insert.req.dto"

export interface InvoiceInsertReqDto {
    file : string 
    fileExtension : string
    supplierId : number 
    invoiceDetails : InvoiceDetailInsertReqDto[]
}