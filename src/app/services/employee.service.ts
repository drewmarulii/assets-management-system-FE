import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { EmployeeResDto } from "../dto/employee/employee.res.dto";
import { EmployeeInsertReqDto } from "../dto/employee/employee-insert.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class EmployeeService {

    constructor(private base: BaseService) { }

    getAllEmployees(): Observable<EmployeeResDto[]> {
        return this.base.get<EmployeeResDto[]>('http://localhost:8080/employees', true)
    }

    insertEmployee(data : EmployeeInsertReqDto) : Observable<EmployeeInsertReqDto> {
        return this.base.post<EmployeeInsertReqDto>('http://localhost:8080/employees', data, true)
    }
}