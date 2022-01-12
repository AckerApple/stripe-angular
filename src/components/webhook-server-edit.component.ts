import { storage } from './storage'
import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'webhook-server-edit',
  templateUrl: './webhook-server-edit.component.html',
}) export class WebhookServerEditComponent {
  storage = storage
  @Output() saveChange: EventEmitter<void> = new EventEmitter()
}
