# About

**TORN City Losers' Log (TLL)** is a tool which **aims to help loss sellers** by providing them

- **insight** into their work and performance
- and a **proof system**.



## Features

- ⚙️ **Processes your last 1k attacks.**
- 📋 **Lists your losses in 4 ways:**
	- Individual losses - just like on TORN or YATA
	- Consecutive losses grouped by client and paid status
	- Losses grouped by client and paid status
	- Unpaid losses grouped by client
- 🧾 **Lists attack log links** for losses and loss groups which **can be used for proof** when requesting payment.
- 💰 **Losses or loss groups can be easily marked as "paid".**
- 📊 **Aggregates your daily loss counts** and shows:
	- A chart with past days' loss counts
	- Today's loss count
	- Yesterday's loss count
	- Average daily loss count
- 📞 Tooltips tell you if a button will perform an API call.
- 🔒 Your data stays in your browser, there's **no server-side code/database,** and no downtime.



## Compared to YATA

[YATA](https://yata.yt/) provides a ton of cool features which help TORN players in various ways. That one set of functions which are relevant in this comparison are on the **[Targets -> Attacks](https://yata.yt/target/attacks)** page.



### Last attacks

Last time I checked, YATA could list my last 1588 attacks.

**TLL** currently manages your last 1000 attacks, but I'm considering to increase the capacity.



### Sync

YATA is centralized, it has an own database on its server, so you can log into it from anywhere.

**TLL** uses the browser's *local* storage, when you want to use it in another browser, you have to sync your data manually. Import/export features are on the way to make it easier!



### Performance

YATA has a server and a database which serves a lot of users. Everyone has to connect to the server to access their data.

**TLL** is a static website, which means it has no server-side code or centralized database. Hosting it is free, your browser can even cache the whole site, so in the end it loads extremely fast and you won't experience slowness or downtime.



### TODO

- Attacks can be **marked as "paid" individually.** - TLL 1-click up to a point
- "Breakdown" feature **counts your attacks by defender** (for outgoing attacks, and by attacker for incoming attacks). - TLL groups by client + paid status
