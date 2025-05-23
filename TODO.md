# v2 TODOs


## fix: attack list update not working

- faulty in Brave, Edge and Safari
- fine in Chrome and Firefox
- new API key doesn't solve it
- it's not API change
- it's not TORN API cache - it caches only for a few minutes, but hours of missing attacks are reported


## feat: options for stats day limit 7/14/custom


## feat: API key change in settings

- should verify player ID


## feat: hiding attack/user

- hide attack / hide user
	- mobile: in ellipsis menu
	- on desktop... need ellipsis menu too I guess
- this should exclude attacks from groups, charts, counts
- need another checkbox in log controls to "Show hidden"


## fix: optimize limit increase

- pass calculated limit & offset to query
- offset := oldLimit
- limit := newLimit - oldLimit


## fix: optimize role/result switch

- use 4 item arrays for extreme fast role/result switches


## feat: live search

- https://www.npmjs.com/package/vue-typeahead-bootstrap
- input for player name or ID
- selects ONE player from dropdown
- filters for defender/attacker ID (in attacker/defender mode)


## feat: start date filter

- filter the whole UI (logs, chart, KPIs)
- **UI? put it in settings?**


## feat: invoice PDF export

- Vue HTML 2 PDF: https://www.npmjs.com/package/vue-html2pdf
- low level PDF lib: https://github.com/bpampuch/pdfmake


## feat: paid+unpaid stacking bar chart

- transform losses chart to stacking bar chart, paid=green, unpaid=blue/red


## feat: invoice for multiple contracts

- user can select attack groups to be included
- invoice will then contain those list items and a total price


## feat: display about markdown file in app


## feat: notes to attack groups

- user can add notes (one text field) to attacks/attack groups
- will also be considered when grouping
- auto filled on update just like prices
- this way contracts with same price can be separated manually
- **where should it be displayed? new layout looks clean now**


## pr: promo banner/poster to forum topic

- 366 or 602px width
- highlight main features w/ zoom circles
	- role switch
	- result switch
	- grouping switch
	- paid button
	- list count + timestamps
	- price & paid
	- dark mode button
- have transparent background (PNG)
- host on GitHub
