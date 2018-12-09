import { Component } from '@angular/core';
import { StripeScriptTag } from 'stripe-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'try';

  constructor(public stripeScriptTag: StripeScriptTag) {
    console.log('setting publish key')
    stripeScriptTag.setPublishableKey('pk_live_***************************')
    .then(()=>console.log('publish key set'))
  }
}
