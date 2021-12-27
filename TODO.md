# v2 TODOs

## 2.0.0

- set app base url to "/torn-losers-log": https://nuxtjs.org/docs/configuration-glossary/configuration-router/#base
- remove old code
- merge to main with commit message:

```md
feat: added handling of escapes; added handling of incoming attacks; added JPG & XLSX export to proofs/invoices; added options for auto-updating of attacks; added automatic player name resolving; added settings page; redesigned UI, better optimized for smaller screens; rewritten storage engine to make TLL faster; fixed bar chart to show days with 0 attacks too; fixed bar chart tooltips' date format; added more KPIs

BREAKING CHANGE: **TLL has been completely rewritten from scratch,** biggest change is that it now manages attacks & names in IndexedDB (instead of in-memory Vuex store).
```

- release
- update GH repo description: *"TLL aims to help TORN City players with loss/escape selling/buying: lists, groups, counts your attacks, stores prices & paid status, shows you KPIs."*
- update forum thread
	- new title: *"[Site] TLL: best friend of loss/esc sellers/buyers"*
	- content readme, first 2 sections
- write post: *"Hey guys, I have big news: I've spent the past 3 weeks rewriting TLL completely and now I'm releasing TLL v2, which now handles escapes and incoming attacks too, and has a few new features as well. Hope you'll enjoy it. :)"*


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
