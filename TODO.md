# v2 TODOs

## 1. Reimplement V1 features

- paid/unpaid logic - **refresh list**
- contract grouping
- log list paging: where? maybe just a "show more?" (+10) at the end + a default item count in settings?
- log list controls: some of them can be combined into a dropdown on really small screens
- log items in group mode: show events in collapsible (or modal with event mode list items with full functionality?)
- set price logic
- price format with suffixes (K/M/B)
- refresh logic
	- call group ID update mechanism
	- call attacks+attacksfull too, to resolve names automatically
- settings page
	- show database metrics, record count, timespan
	- export/import feature
	- clear feature
- import feature should be accessible from the start screens, between migrate and connect
- charts - where? separate page?
- changelog display (make it so it splits commit lines into multiple list items: `; ` -> `\n- `)
- new version notifier
- forum thread alert, above 1500 attack records
- **at the end** remove old code
- merge to main with commit message:

```md
feat: added handling of escapes; added handling of incoming attacks; added auto name resolving; redesigned UI is better optimized for smaller screens; [...]

BREAKING CHANGE: **TLL has been completely rewritten from scratch,** biggest change is that it now uses IndexedDB to store attacks and resolved names.
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
