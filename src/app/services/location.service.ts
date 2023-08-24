import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { LocationResDto } from "../dto/location/location.res.dto";
import { LocationInsertReqDto } from "../dto/location/location-insert.req.dto";
import { LocationUpdateReqDto } from "../dto/location/location-update.req.dto";

@Injectable({
    providedIn : 'root'
})
export class LocationService {
    
    constructor(private base: BaseService) { }

    getAllLocations(): Observable<LocationResDto[]> {
        return this.base.get<LocationResDto[]>('http://localhost:8080/locations', true)
    }

    insertLocation(data : LocationInsertReqDto): Observable<LocationInsertReqDto> {
        return this.base.post<LocationResDto>('http://localhost:8080/locations', data, true)
    }

    getById(id : number): Observable<LocationResDto> {
        return this.base.get<LocationResDto>(`http://localhost:8080/locations/detail?code=${id}`, true)
    }

    updateLocation(data : LocationUpdateReqDto): Observable<LocationUpdateReqDto> {
        return this.base.patch<LocationUpdateReqDto>('http://localhost:8080/locations', data, true)
    }
}