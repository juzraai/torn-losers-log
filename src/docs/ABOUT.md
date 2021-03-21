# About

**TORN City Losers' Log (TLL)** is a tool which **aims to help loss sellers** by providing them

- **automatic counting**
- **daily performance statistics**
- and a **proof system**.



## Features

- ⚙️ **Manages your last 5000 losses** (TORN returns the last 1000 attacks, TLL then updates incrementally)
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
- 📷 You can hide client names if you want to do a screenshot to show only your stats or **TLL** features.



## Compared to YATA

[YATA](https://yata.yt/) provides a ton of cool features which help TORN players in various ways. That one set of functions which are relevant in this comparison are on its **[Targets -> Attacks](https://yata.yt/target/attacks)** page.

**TLL** specifically targets loss sellers, so it's not a complete replacement for YATA, but may better serve loss sellers. However, in some aspects YATA can be still a better choice, that is why I'm writing this chapter and trying to be as objective as I can.

**Below comparison is written on Mar 21, 2021. If YATA gets relevant updates or you find a mistake here, please contact me.**



### Last attacks

TORN API can return your last 1000 attacks. So both YATA and TLL can only display your last 1000 losses at most with the first fetch.

YATA stores attacks in its database and updates incrementally, with a cap of **1588 attacks.**

**TLL** works in a similar way, though it only stores outgoing losses. The current cap is set to **5000 losses,** but it might change in the future.



### "Paid" marking

YATA allows you to tick a "Paid" checkbox for every attack, **individually.** Actually, this was [my suggestion back then](https://www.torn.com/forums.php#/p=threads&f=67&t=16100118&b=0&a=0&start=200&to=20218792) and its developer implemented it right away. :)

**TLL** makes it more simple. When you mark a loss as "paid", you **also mark all previous losses to the same defender.**



### Loss counting

YATA's "Breakdown" feature **counts your outgoing attacks by defender.**

**TLL** aggregates **by defender and paid status,** this way previous contracts of the same client won't bother you when you check your current unpaid status.



### Sync

YATA is centralized, it stores your data in a database on its server, so **you can log in from anywhere** to see your data.

**TLL** uses the browser's *local* storage. When you want to use it in another browser, **you have to sync your data manually.** Import/export features are on the way to make this easier!



### Performance

YATA has a **server and a database** which serves a lot of users, who use a lot of features, often at the same time. You have to connect to the server to access your data.

**TLL** is a **static website,** which means it has no server-side code or centralized database. Your browser can cache the whole site and your data lives in your browser. So, the page and your data loads faster.
