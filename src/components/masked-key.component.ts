import { Component, Input } from '@angular/core'
import { copyText } from './app.component.utils'

@Component({
  selector: 'masked-key',
  templateUrl: './masked-key.component.html',
}) export class MaskedKeyComponent {
  copyText = copyText

  @Input() value: any
  @Input() mask: any
}
