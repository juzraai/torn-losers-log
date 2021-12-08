# TODO list


## design: dark mode


## bug: chart tooltips use different date format


## bug: chart skips days with no data - should iterate over calendar days


## feat: save items/page settings


## feat: start date filter

- filter the whole UI (logs, chart, KPIs)
- **this is essential to the defenders version!**


## epic: defender's log

A) fork TLL, flip outgoing to incoming

B) extend TLL filters, use one array

- log entries would contain direction: outgoing losses or incoming losses (=defends) (missing = outgoing)
- grouping should be extended to use this
- buying and selling could be on separate pages

Either way:

- buyers need different KPIs: defends won, kill streak, war machine
- maybe a "set goal" feature which saves the timestamp and a defend count goal, and shows progress - should save automatically if reaches 100%, so log rotation won't disturb the progress display


## epic: manage escapes too

A) separate "escapes" array besides "losses"

- separate pages too and ALL other computed stuff? seems a lot of work

B) one array for all with extended filters

- log entries would contain outcome (missing = "lost")
- grouping should use outcome too (for different prices)
- setting price on individual attack: restrict to same outcome
- maybe have "Losses" and "Escapes" tab separately, rest is fine
- what about KPIs and the chart?


## feat: income/day stats/chart


## feat: proof export

- buttons in top right corner
- copy to clipboard as unformatted text
- generate and download PDF - https://github.com/bpampuch/pdfmake


## feat: invoice generator in modal/separate page

- list of unpaid contracts with remove from invoice btn
- calculates ~~subtotals and~~ total
- formats as PRE for Discord, or maybe provides more format options (screenshot download???)
- combined proof download options (copy all, PDF all)


## pr: promo banner/poster to forum topic

- 366 or 602px width
- highlight main features, zoom circles
- have transparent background (PNG)
- host on GitHub


## feat: settings (page)

- on settings page OR on widget top right dropdown menu w/ ellipsis-v icon
- bar chart options for day limit: 10, 15, 21, 30
- select log tabs to show/hide with checkboxes
- set limit for stored losses (lower limit can improve UX)
- easier API key change


## feat: hide certain losses

A) log entry level

- button in log entry - like "Paid/Unpaid" button can be a split button and dropdown could have a "Hide" feature
- excludes losses from top widgets and Sessions/Clients/Unpaid tabs
- on Losses tab it can be w/ lighter font color, without Paid button, but with Unhide
- grouping should consider "hidden" flag too - just jump over it

B) client level

- button on clients tab entry
- hides from top widgets and all tabs
- hidden client list and unhide option on settings page


## feat: price related KPIs/charts

- earned today/this week/this month
- daily/weekly earned money chart
- what else?


## feat: paid+unpaid stacking bar chart

- transform losses chart to stacking bar chart, paid=green, unpaid=blue/red


## feat: display about markdown file in app


## feat: facelift ideas

price:

- move total price to right (green=paid, red=unpaid), replace Paid button with checkbox
- nicer editor for price

colors:

- match TORN colors?
- add dark mode?

log entries:

- stocks3 style design paid button: green circle with "$" symbol, full green on hover
- "[view]" in log entries for better understanding - needs more space tho
- entries as cards: vertical inner layout with big number - not ideal for screenshot proof


## env: upgrade stack to Vue CLI 4, Vue 3