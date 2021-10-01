import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, TemplateRef } from "@angular/core"

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html'
}) export class MenuOptionsComponent {
  @Input() value: any
  @Output() valueChange: EventEmitter<any> = new EventEmitter()

  @ContentChildren('option') options:TemplateRef<ElementRef>[]

  ngAfterViewInit(){
    console.log('this.options', this.options)
  }
}