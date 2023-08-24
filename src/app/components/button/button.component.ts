import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-button',
    template: `
        <button class="{{ classBtn }}" (click)=clickBtn()>{{ label }}</button>
    `,
    standalone: true
})

export class ButtonComponent {
    @Input() label = ''
    @Input() classBtn = ''

    @Output() clickChange = new EventEmitter<void>()

    clickBtn() {
        this.clickChange.emit()
    }
}