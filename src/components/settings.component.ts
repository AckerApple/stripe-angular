import { Component, EventEmitter, Input, Output } from '@angular/core'
import { copyText, getProjectLocalStorage, getSaveableStorage } from './app.component.utils'
import { localSchema } from './storage'

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
}) export class SettingsComponent {
  @Input() storage: localSchema

  @Input() edit: boolean
  @Output() editChange: EventEmitter<boolean> = new EventEmitter()

  @Output() saveChange: EventEmitter<void> = new EventEmitter()
  @Output() metadataUpdate: EventEmitter<any> = new EventEmitter()

  tempPublishableKey: string
  tempPrivateKey: string// localStorage?.stripeAngularPrivateKey;

  copyText = copyText

  ngOnInit(){
    this.tempPrivateKey = this.storage.privateKey// localStorage?.stripeAngularPrivateKey;
    this.tempPublishableKey = this.storage.key

    if (!this.storage.key) {
      this.edit = true
    }
  }

  save() {
    this.storage.key = this.tempPublishableKey || this.storage.key
    this.storage.privateKey = this.tempPrivateKey || this.storage.privateKey
    this.saveChange.emit()
  }

  copyShareUrl() {
    const storage = getSaveableStorage(this.storage)

    // do let next client auto assume saving these
    delete storage.saveRequestsLocal
    delete storage.savePrivateKeyLocally
    delete storage.saveKeyLocally

    if (storage.privateKey && !confirm('include private server key?')) {
      delete storage.privateKey
    }

    const storageString = encodeURI(JSON.stringify(storage))
    const url = window.location.href.split('?').shift() + '?storage=' + storageString
    copyText(url)
    alert('copied')
  }

  toggleServerMode() {
    if (this.storage.savePrivateKeyLocally) {
      if (confirm('Confirm to delete secrets and private keys')) {
        localStorage.stripeAngularPrivateKey = null
        delete localStorage.stripeAngularPrivateKey
        // delete this.tempPrivateKey
        delete this.storage.privateKey
        delete this.storage.webhookSigningSecret
        // delete this.tempPublishableKey
        this.save()
        return this.storage.savePrivateKeyLocally = false
      }
    }

    this.storage.savePrivateKeyLocally = true
  }

  updateStorageMeta(stringData: string) {
    this.storage.metadata = JSON.parse(stringData)
    this.metadataUpdate.emit(this.storage.metadata)
  }

  deleteLocalStorage() {
    localStorage.stripeAngular = null
    delete localStorage.stripeAngular

    // support old delete
    localStorage.stripeAngularPrivateKey = null;
    localStorage.stripeAngularKey = null;
    delete localStorage.stripeAngularPrivateKey;
    delete localStorage.stripeAngularKey;
    this.storage = getProjectLocalStorage()
  }
}
