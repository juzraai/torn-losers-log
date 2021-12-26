# v2 TODOs

## 2.0.0

- new version notifier
- forum thread alert, above 1500 attack records
- tutorial card on log screen, can be closed, but reopened in settings
	- aware of current screen size
	- explain switch btn groups, with icons
- check and merge V1 TODOs here
- rewrite README - see v1
- review meta description
- review favicon
- create & setup OG image: show screenshots of app!!!
- set app base url to "/torn-losers-log": https://nuxtjs.org/docs/configuration-glossary/configuration-router/#base
- **at the end** remove old code
- merge to main with commit message:

```md
feat: added handling of escapes; added handling of incoming attacks; added JPG & XLSX export to proofs/invoices; added options for auto-updating of attacks; added automatic player name resolving; added settings page; redesigned UI, better optimized for smaller screens; rewritten storage engine to make TLL faster; fixed bar chart to show days with 0 attacks too; added more KPIs

BREAKING CHANGE: **TLL has been completely rewritten from scratch,** biggest change is that it now manages attacks & names in IndexedDB (instead of in-memory Vuex store).
```


## feat: name resolver service

- init from init.client.js
- setInterval, 5s
	- this should be configurable in settings: 0=off / X seconds
- let resolvedIds; await db.players.orderBy('id').uniqueKeys(ks => resolvedIds = ks);
- attacks.where('opponentId').noneOf(resolvedIds).limit(1)
- resolve it, store it

## feat: API key change in settings

- should verify player ID


## feat: hiding attack/user

- hide attack / hide user
	- mobile: in ellipsis menu
	- on desktop... need ellipsis menu too I guess
- this should exclude attacks from groups, charts, counts
- need another checkbox in log controls to "Show hidden"


## feat: live search:

- https://www.npmjs.com/package/vue-typeahead-bootstrap
- input for player name or ID
- selects ONE player from dropdown
- filters for defender/attacker ID (in attacker/defender mode)


## fix: optimize limit increase

- pass calculated limit & offset to query
- offset := oldLimit
- limit := newLimit - oldLimit


## fix: optimize role/result switch

- use 4 item arrays for extreme fast role/result switches


## feat: notes to attack groups

- user can add notes (one text field) to attacks/attack groups
- will also be considered when grouping
- auto filled on update just like prices
- this way contracts with same price can be separated manually
- **where should it be displayed? new layout looks clean now**
