//import { Component, NgModule } from '@angular/core';
//import { inject, ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StripeScriptTag } from "./StripeScriptTag"

describe('StripeScriptTag', () => {
  
  it('inits', ()=>{
    expect(StripeScriptTag).not.toBeNull();
    expect(new StripeScriptTag()).not.toBeNull();
  })
})