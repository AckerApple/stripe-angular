import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core"

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html'
}) export class MenuOptionsComponent {
  @Input() value: any
  @Input() title: string
  @Output() valueChange: EventEmitter<any> = new EventEmitter()
  @Output() close: EventEmitter<void> = new EventEmitter()

  @ContentChildren('option') options:TemplateRef<ElementRef>[]
  @ViewChild('absElement', { static: false }) absElement: ElementRef;
  interval: any

  ngAfterViewInit(){
    this.updatePosition()
    this.interval = setInterval(() => this.updatePosition(), 5000)
  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }

  updatePosition() {
    this.handlePosition( this.absElement.nativeElement.firstChild, this.absElement.nativeElement )
  }

  handlePosition(dropdown, placeholder) {
    const screenPadding = 16;

    const placeholderRect = placeholder.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();

    const dropdownRightX = dropdownRect.x + dropdownRect.width;
    const placeholderRightX = placeholderRect.x + placeholderRect.width;

    if (dropdownRect.x < 0) {
      dropdown.style.left = '0';
      dropdown.style.right = 'auto';
      dropdown.style.transform = `translateX(${-placeholderRect.x + screenPadding}px)`;
    } else if (dropdownRightX > window.innerWidth) {
      dropdown.style.left = 'auto';
      dropdown.style.right = '0';
      dropdown.style.transform = `translateX(${(window.innerWidth - placeholderRightX) - screenPadding}px)`;
    }
  }
}