import "zone.js"
import "reflect-metadata"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { AppModule } from "./app.module"

platformBrowserDynamic().bootstrapModule(AppModule)