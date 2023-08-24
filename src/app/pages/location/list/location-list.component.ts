import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { LocationResDto } from "../../../dto/location/location.res.dto";
import { LocationService } from "../../../services/location.service";

@Component({
    selector: 'location-list',
    templateUrl: './location-list.component.html'
})
export class LocationListComponent implements OnInit {

    visible : boolean = false
    visible1: boolean = false
    visible2: boolean = false
    locations! : LocationResDto[]

    locationInsertReqDto = this.fb.group({
        locationNumber : ['', [Validators.required]],
        locationDetail : ['', [Validators.required]]
    })

    locationUpdateReqDto = this.fb.group({
        id: [0, [Validators.required]],
        locationNumber : ['', [Validators.required]],
        locationDetail : ['', [Validators.required]]
    })

    constructor(
        private locationService : LocationService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
        ) { 
            this.title.setTitle('Location | Assets Management System')
        }

    ngOnInit(): void {
        this.locationList
    }

    get locationList() {
       return this.locationService.getAllLocations()
            .subscribe((res) => {
                this.locations = res;
            })
    }

    onCreate() : void {
        if (this.locationInsertReqDto.valid) {
            const data = this.locationInsertReqDto.getRawValue()
            this.locationService.insertLocation(data).subscribe(result => {
                this.locationList
                this.router.navigateByUrl('/locations')
            })
        }
        this.locationInsertReqDto.reset()
        this.visible = false
    }

    showDialog() {
        this.visible = true
    }

    showDialog1() {
        this.visible1 = true
    }

    showDialog2(locationId : number) {
        this.visible2 = true
        this.locationService.getById(locationId).subscribe((res) => {
            this.locationUpdateReqDto.patchValue({
                id : locationId,
                locationNumber: res.locationNumber,
                locationDetail: res.locationDetail
            })
        })
    }

    onUpdate() : void {
        if (this.locationUpdateReqDto.valid) {
            const data = this.locationUpdateReqDto.getRawValue()
            this.locationService.updateLocation(data).subscribe((res) => {
                this.visible2 = false
                this.locationList
                this.router.navigateByUrl('/locations')
            })
        }

        this.locationUpdateReqDto.reset()
        this.visible = false
    }
}