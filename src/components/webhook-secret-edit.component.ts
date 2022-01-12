import { storage } from './storage'
import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'webhook-secret-edit',
  templateUrl: './webhook-secret-edit.component.html',
}) export class WebhookSecretEditComponent {
  storage = storage
  @Output() saveChange: EventEmitter<void> = new EventEmitter()
}
