# v2 TODOs

## 1. Reimplement V1 features

- invoice: export features
	- TSV (no, timestamp, code, attacker, defender, result, price)
	- XLSX (same cols)
	- PNG - just export the main area of Screen if possible
	- PDF - export Screen element as it is, with clickable links
- log list controls on XS:
	- hide entirely
	- show hamburger menu (dropdown) on the right side of list header
- settings page
	- show database metrics, record count, timespan
	- default list item count (10/15/20)
	- auto update settings:
		- update when opened (layout beforeCreate!): on/off
		- update interval: 0 (off), or X minutes - when it's running, don't show loading screen
		- if interval is OFF, the refresh button is showing, otherwise hidden
	- export/import feature
	- clear feature
- import feature should be accessible from the start screens, between migrate and connect
- charts - where? separate page? or **should this be a grouping option??????** sounds awesome at first :D
	- header: role+result + update, right: lead attacks/day avg
	- attacks/day chart on top - include 0-attack day too
		- Chart.js? https://www.chartjs.org/docs/latest/samples/other-charts/combo-bar-line.html
		- https://vue-chartjs.org/
	- attacks/day list below - same table as log list, with some mods
		- phrase slot: You lost to X players (???)
		- price slot: paid price on top, unpaid price on bottom, no /ea price
		- NO paid button slot
	- would be nice if timezone could be set on settings page, for these
- changelog display (make it so it splits commit lines into multiple list items: `; ` -> `\n- `)
- new version notifier
- forum thread alert, above 1500 attack records
- rewrite README
- help page in app?
- review meta description
- review favicon
- create & setup OG image: show screenshots of app!!!
- **at the end** remove old code
- merge to main with commit message:

```md
feat: added handling of escapes; added handling of incoming attacks; added automatic player name resolving; redesigned UI, better optimized for smaller screens; rewritten storage engine to make TLL faster; [...]

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
