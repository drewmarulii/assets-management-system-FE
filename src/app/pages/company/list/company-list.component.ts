import { CompanyService } from "../../../services/company.service";
import { Component, OnInit } from "@angular/core";
import { CompanyResDto } from "../../../dto/company/company.res.dto";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html'
})

export class CompanyListComponent implements OnInit {

    imgUrl!: string 
    companies!: CompanyResDto[]
    visible : boolean = false

    constructor (private companyService : CompanyService) { }

    ngOnInit(): void {
        this.companyService.getAllCompanies()
            .subscribe((res) => {
                this.companies = res
            })
    }

    showDialog() {
        this.visible = true
    }
}