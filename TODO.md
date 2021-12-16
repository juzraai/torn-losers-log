# v2 TODOs

- groupID: use timestamp instead of code?
	- **YEP! Because then I can do this:** `await this.$db.attacks.orderBy('group').reverse().uniqueKeys(keys => console.log(keys));`
- migrate: names & attacks - should use transaction: https://dexie.org/docs/Dexie/Dexie.transaction() and maybe bulkAdd/bulkPut
- log screen
- charts - where? separate page?
- settings page
	- show database metrics, record count, timespan
	- API key change - verify player ID!
	- export/import feature
	- clear feature
- import feature should be accessible from the start screens, between migrate and connect
