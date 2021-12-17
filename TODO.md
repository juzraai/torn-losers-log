# v2 TODOs

- log items:
	- always group! collapsible will show individual events
	- number in the beginnning of line, bigger font, clickin on it will open collapsible
	- **how TF I will do contract grouping w/ Dexie? :D**
		- maybe we'll need another key for that?
		- then rename "group" to "session" and add new "contract"
- log paging
	- where?
	- maybe just add a "Show more" on the bottom to get +10 items
- paid/unpaid logic
	- will be tricky, I have to regenerate group IDs, starting right after the previous newest unmodified attack and CANNOT filter records for this, I have to iterate all... (or else I mess up sessions in case there's something else in between)
- set price logic
	- this will need group ID regeneration too...
- settings page
	- show database metrics, record count, timespan
	- API key change - verify player ID!
	- export/import feature
	- clear feature
- import feature should be accessible from the start screens, between migrate and connect
- refresh logic - watch out for group ID generation!
- charts - where? separate page?
- log controls:
	- group criteria: consecutives / contract

	- show hidden (default false) (checkbox) icon???
	- on mobile, some buttons can go into a dropdown button
