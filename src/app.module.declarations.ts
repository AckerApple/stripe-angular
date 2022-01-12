import { WebhookSecretEditComponent } from "./components/webhook-secret-edit.component"
import { WebhookServerEditComponent } from "./components/webhook-server-edit.component"
import { SimpleRouteEditComponent } from "./components/simple-route-edit.component"
import { KeysInputArrayComponent } from "./components/keys-input-array.component"
import { ToolRelationsComponent } from "./components/tool-relations.component"
import { MenuOptionsComponent } from "./components/menu-options.component"
import { GroupToolsComponent } from "./components/group-tools.component"
import { PastesMenuComponent } from "./components/pastes-menu.component"
import { KeyChangerComponent } from "./components/key-changer.component"
import { MaskedKeyComponent } from "./components/masked-key.component"
import { ToolWrapComponent } from "./components/tool-wrap.component"
import { SettingsComponent } from "./components/settings.component"
import { DumpComponent } from "./components/dump.component"
import { AppComponent } from "./components/app.component"


export const declarations = [
  AppComponent,
  PastesMenuComponent,
  MenuOptionsComponent,
  MaskedKeyComponent,
  KeyChangerComponent,
  SettingsComponent,
  WebhookServerEditComponent,
  WebhookSecretEditComponent,
  KeysInputArrayComponent,
  DumpComponent,

  GroupToolsComponent,
  ToolRelationsComponent,
  ToolWrapComponent,

  SimpleRouteEditComponent,
]