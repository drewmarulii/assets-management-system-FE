import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../../services/employee.service";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { CompanyService } from "../../../services/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";

@Component({
    selector: 'employee-create',
    templateUrl: './employee-create.component.html'
})
export class EmployeeCreateComponent implements OnInit, AfterViewChecked {

    companies!: CompanyResDto[]

    employeeInsertReqDto = this.fb.group({
        employeeName: ['', [Validators.required]],
        companyId: [0, [Validators.required]]
    })

    constructor(
        private employeeService: EmployeeService,
        private companyService: CompanyService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Employee Create | Assets Management System')
    }

    ngOnInit(): void {
        this.companyService.getAllCompanies()
            .subscribe((res) => {
                this.companies = res
            })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    onCreate(): void {
        if (this.employeeInsertReqDto.valid) {
            const data = this.employeeInsertReqDto.getRawValue()
            this.employeeService.insertEmployee(data).subscribe((result) => {
                this.router.navigateByUrl('/employees')
            })
        }
    }
}