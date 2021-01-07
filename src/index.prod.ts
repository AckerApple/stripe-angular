import { enableProdMode } from "@angular/core"
enableProdMode()


import "zone.js"
import "reflect-metadata"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { AppModule } from "./app.module"

platformBrowserDynamic().bootstrapModule(AppModule)


//export * from "./index"
//import * from "./index.ts"
