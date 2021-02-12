# stripe-angular - Change Log
All notable changes to this project will be documented here.

## [1.6.0] - (2021-02-11)

- stripe-card supports createOptions

## [1.5.3] - (2021-01-04)
- stripe-card directive now supports (changed) event

## [1.5.1] - (2021-01-04)
- Create Card Payment Method
- Stripe data typings instead of created ones
- Demo area has much more testing functionality
- installing `@types/stripe-v3` is now a required peerDependency

## [1.4.3] - (2020-11-19)
- more demo support
- fixes
## [1.4.0] - (2020-11-19)
- stripe-card now has [(complete)], [complete] and (completeChange) bindings
- Better typings

## [1.3.0] - (2020-11-18)
- built on Angular11
- creating payment source now accepts parameters
  - metadata, owner, and so on...

## [1.1.0] - (2020-05-25)
- stripe-card now has (cardMounted) output binding

## [0.6.0] - (2019-08-17)
- move templates into components to just satify Ivy

## [0.5.0] - (2019-06-07)
- built in strict mode
- built on ng8
- upgraded test process

## [0.4.2] - (2019-04-03)
- Documentation
- Remove extra data from createSource
- stripe-bank does NOT work with Stripe source. Removed for now

## [0.4.1] - (2019-03-25)
- Made stripe-source a base component of stripe-bank and stripe-card

## [0.4.0] - (2019-03-25)
- BETA: Added support for creating sources as stripe-source component

## [0.3.2] - (2018-03-25)
- Fix loading Stripe when its already been loaded before

## [0.3.1] - (2018-03-25)
- Fix context of StripeCard component init function
- updated dependencies

## [0.2.4] - (2018-12-10)
- Support lazy loading with forRoot() module definition

## [0.2.4] - (2018-12-07)
- correct loading sequence

## [0.2.3] - (2018-12-06)
- potential fix for race loading issue

## [0.2.1] - (2018-10-29)
- Removed hello world from bad stripe id
- added bank_account type

## [0.2.0] - (2018-10-25)
- Added stripe-bank and Angular7

## [0.1.0] - (2018-01-26)
- added [(invalid)] two way binding for when validation fails
### Breaking Changes
- (catch) is only called when a non validation_error occurs

## [0.0.3] - (2018-01-09)
- made StripeCard component available from index as an export

## [0.0.0] - (2018-01-09)
- init commit