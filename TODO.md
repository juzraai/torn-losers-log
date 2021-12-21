# v2 TODOs

## 1. Reimplement V1 features

- list item on mobile screens: ellipsis menu should be a "clickable" slot
- list header on mobile screens:
	- unpaid sum should go into left cell in parens
	- hide "updated" word
- log list paging:
	- show (limit+10) / show only (limit+10) buttons
	- show (limit+10) appears if: items.length === limit
	- show (limit-10) appears if limit > limit-10 && items.length > limit-10
- contract grouping
- log list controls on XS:
	- hide entirely
	- show hamburger menu (dropdown) on the right side of list header
- log items in group mode: show events in collapsible (or modal with event mode list items with full functionality?)
- set price logic
- refresh logic
	- call group ID update mechanism
	- call attacks+attacksfull too, to resolve names automatically
- settings page
	- list item count (10/20...)
	- auto update settings:
		- update when opened: on/off
		- update interval: 0 (off), or X minutes
		- if interval is OFF, the refresh button is showing, otherwise hidden
	- show database metrics, record count, timespan
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
- **at the end** remove old code
- merge to main with commit message:

```md
feat: added handling of escapes; added handling of incoming attacks; added auto name resolving; redesigned UI, better optimized for smaller screens; rewritten storage engine to be faster; [...]

BREAKING CHANGE: **TLL has been completely rewritten from scratch,** biggest change is that it now manages attacks & names in IndexedDB (instead of in-memory Vuex store).
```


## 2. Implement new features

- hiding feature
	- hide attack / hide user
	- this should exclude attacks from groups, charts, counts
	- need another checkbox in log controls to "Show hidden"
- live search:
	- https://www.npmjs.com/package/vue-typeahead-bootstrap
	- input for player name or ID
	- selects ONE player from dropdown
	- filters for defender/attacker ID (in attacker/defender mode)
- name resolver service:
	- init from init.client.js
	- setInterval, 5s
	- find (somehow) 1 unresolved player ID
	- resolve it
- API key change feature in settings - verify player ID!


## Future features

- (not important) use 4 item arrays? update only the active one - for extreme fast role/result switches
