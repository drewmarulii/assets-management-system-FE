import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { ProviderResDto } from "../dto/provider/provider.res.dto";
import { ProviderInsertReqDto } from "../dto/provider/provider-insert.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class ProviderService {

    constructor(private base: BaseService) { }

    getAllProviders(): Observable<ProviderResDto[]> {
        return this.base.get<ProviderResDto[]>('http://localhost:8080/providers', true)
    }

    insertProvider(data : ProviderInsertReqDto) : Observable<ProviderInsertReqDto> {
        return this.base.post<ProviderInsertReqDto>('http://localhost:8080/providers', data, true)
    }
}