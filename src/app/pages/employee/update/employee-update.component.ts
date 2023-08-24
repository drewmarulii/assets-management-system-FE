import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CompanyResDto } from "src/app/dto/company/company.res.dto";
import { CompanyService } from "src/app/services/company.service";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
    selector: 'employee-update',
    templateUrl: './employee-update.component.html'
})
export class EmployeeUpdateComponent {

    companies! : CompanyResDto[]

    employeeUpdateReqDto = this.fb.group({
        employeeName : [''],
        companyId : [0]
    })

    constructor(
        private employeeService: EmployeeService,
        private companyService : CompanyService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Employee Update | Assets Management System')
    }

    ngOnInit(): void {
        this.companyService.getAllCompanies()
            .subscribe((res) => {
                this.companies = res
            })
    }

    onUpdate() : void {
        if (this.employeeUpdateReqDto.valid) {
            const data =this.employeeUpdateReqDto.getRawValue()

        }
    }
}