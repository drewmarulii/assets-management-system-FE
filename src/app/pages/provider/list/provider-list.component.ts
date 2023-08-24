import { Component, OnInit } from "@angular/core";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { ProviderService } from "../../../services/provider.service";

@Component({
    selector: 'provider-list',
    templateUrl: './provider-list.component.html'
})
export class ProviderListComponent implements OnInit {

    visible: boolean = false
    providers! : ProviderResDto[]

    constructor(private providerService : ProviderService) { }

    ngOnInit(): void {
        this.providerService.getAllProviders()
            .subscribe((res) => {
                this.providers = res;
            })
    }

    showDialog() {
        this.visible = true
    }
}