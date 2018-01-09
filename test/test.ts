import './polyfills.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare var __karma__: any;
declare var require: any;

__karma__.loaded = Function.prototype;

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

//grab all test files
const context = require.context('../src', true, /\.spec\.ts/);
//require all test files. HINT: Typically requires tsconfig.json to have: {"include": ["**/*.spec.ts"]}
context.keys().map(filepath=>context(filepath))

__karma__.start();