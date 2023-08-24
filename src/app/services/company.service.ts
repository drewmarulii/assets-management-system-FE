import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { CompanyInsertReqDto } from "../dto/company/company-insert.req.dto";
import { CompanyUpdateComponent } from "../pages/company/update/company-update.component";
import { CompanyUpdateReqDto } from "../dto/company/company-update.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class CompanyService {
    
    constructor(private base: BaseService) { }

    getAllCompanies(): Observable<CompanyResDto[]> {
        return this.base.get<CompanyResDto[]>('http://localhost:8080/companies', true)
    }

    insertCompany(data : CompanyInsertReqDto): Observable<CompanyInsertReqDto> {
        return this.base.post<CompanyInsertReqDto>('http://localhost:8080/companies', data, true)
    }

    getById(id : number): Observable<CompanyResDto> {
        return this.base.get<CompanyResDto>(`http://localhost:8080/companies/search?code=${id}`, true)
    }

    updateCompany(data: CompanyUpdateReqDto): Observable<CompanyUpdateReqDto> {
        return this.base.patch<CompanyUpdateReqDto>('http://localhost:8080/companies', data, true)
    }
}