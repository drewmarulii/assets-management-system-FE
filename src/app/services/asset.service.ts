import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { AssetResDto } from "../dto/asset/asset.res.dto";
import { AssetInsertReqDto } from "../dto/asset/asset-insert.req.dto";
import { AssetStatusResDto } from "../dto/asset/asset-status.res.dto";
import { AssetTypeResDto } from "../dto/asset/asset-type.res.dto";
import { AssetGeneralResDto } from "../dto/asset/asset-general.res.dto";
import { AssetUpdateStatusReqDto } from "../dto/asset/asset-update-status.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class AssetService {

    constructor(private base: BaseService) { }

    getAllAssets(): Observable<AssetResDto[]> {
        return this.base.get<AssetResDto[]>('http://localhost:8080/assets', true)
    }

    insertAsset(data : AssetInsertReqDto): Observable<AssetInsertReqDto>{
        return this.base.post<AssetInsertReqDto>('http://localhost:8080/assets', data, true)
    }

    getAllStatus(): Observable<AssetStatusResDto[]> {
        return this.base.get<AssetStatusResDto[]>('http://localhost:8080/assetstatus', true)
    }

    getAllTypes(): Observable<AssetTypeResDto[]> {
        return this.base.get<AssetTypeResDto[]>('http://localhost:8080/assettypes', true)
    }

    getAssetGeneral() : Observable<AssetGeneralResDto[]> {
        return this.base.get<AssetGeneralResDto[]>('http://localhost:8080/assets/general', true)
    }

    getAssetByType(code : number) : Observable<AssetResDto[]> {
        return this.base.get<AssetResDto[]>(`http://localhost:8080/assets/search?code=${code}`, true)
    }

    updateStatus(data : AssetUpdateStatusReqDto) : Observable<AssetUpdateStatusReqDto> {
        return this.base.patch<AssetUpdateStatusReqDto>(`http://localhost:8080/assets`, data, true)
    }

    getById(id : number) : Observable<AssetResDto> {
        return this.base.get<AssetResDto>(`http://localhost:8080/assets/byId?code=${id}`, true)
    }
}