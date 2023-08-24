import { Component, OnInit } from "@angular/core";
import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";
import { EmployeeService } from "../../../services/employee.service";

@Component({
    selector: 'employee-list',
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

    employees! : EmployeeResDto[]
    visible : boolean = false

    constructor(private employeeService : EmployeeService) { }

    ngOnInit(): void {
        this.employeeService.getAllEmployees()
            .subscribe((res) => {
                this.employees = res
            })
    }

    showDialog(id : number) {
        this.visible = true
    }
}