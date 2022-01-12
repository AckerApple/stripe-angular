import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core'

@Component({
  selector: 'keys-input-array',
  templateUrl: './keys-input-array.component.html',
}) export class KeysInputArrayComponent {
  @Input() array: any[]
  
  @Input() selected: any
  @Output() selectedChange: EventEmitter<any> = new EventEmitter()
  
  @Input() inputType: string = 'text'
  @Input() inputPlaceholder: string = 'Value'
  @Input() allowChange: any

  @ContentChild('valueFooter', { static: false }) valueFooter: TemplateRef<ElementRef>
  @ContentChild('footer', { static: false }) footer: TemplateRef<ElementRef>
}
