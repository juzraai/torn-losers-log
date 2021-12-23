# v2 TODOs

## 1. Reimplement V1 features

- settings page
	- show database metrics, record count, timespan
	- default list item count (10/15/20)
- charts - **figure out how/where**
- changelog display (make it so it splits commit lines into multiple list items: `; ` -> `\n- `)
- new version notifier
- forum thread alert, above 1500 attack records
- rewrite README
- help page in app?
- review meta description
- review favicon
- create & setup OG image: show screenshots of app!!!
- set app base url to "/torn-losers-log": https://nuxtjs.org/docs/configuration-glossary/configuration-router/#base
- **at the end** remove old code
- merge to main with commit message:

```md
feat: added handling of escapes; added handling of incoming attacks; added JPG & XLSX export to proofs/invoices; added options for auto-updating of attacks; added automatic player name resolving; added settings page; redesigned UI, better optimized for smaller screens; rewritten storage engine to make TLL faster; [...]

BREAKING CHANGE: **TLL has been completely rewritten from scratch,** biggest change is that it now manages attacks & names in IndexedDB (instead of in-memory Vuex store).
```


## 2. Implement new features

- name resolver service:
	- init from init.client.js
	- setInterval, 5s
		- this should be configurable in settings: 0=off / X seconds
	- let resolvedIds; await db.players.orderBy('id').uniqueKeys(ks => resolvedIds = ks);
	- attacks.where('opponentId').noneOf(resolvedIds).limit(1)
	- resolve it, store it
- API key change feature in settings - verify player ID!


## Future features

- hiding feature
	- hide attack / hide user
	- this should exclude attacks from groups, charts, counts
	- need another checkbox in log controls to "Show hidden"
- live search:
	- https://www.npmjs.com/package/vue-typeahead-bootstrap
	- input for player name or ID
	- selects ONE player from dropdown
	- filters for defender/attacker ID (in attacker/defender mode)
- (not important) use 4 item arrays? update only the active one - for extreme fast role/result switches
- notes:
	- user can add notes (one text field) to attacks/attack groups
	- will also be considered when grouping
	- auto filled on update just like prices
	- this way contracts with same price can be separated manually
