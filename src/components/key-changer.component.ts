import { Component, EventEmitter, Input, Output } from '@angular/core'
import { KeyInfo } from './app.component.utils'

@Component({
  selector: 'key-changer',
  templateUrl: './key-changer.component.html'
}) export class KeyChangerComponent {
  @Input() keys: KeyInfo[]
  @Input() value: string
  @Output() valueChange: EventEmitter<string> = new EventEmitter()
}