class Stopwatch {
	constructor(name) {
		this.name = name
		this.time = -new Date().getTime()
	}

	tock() { // TODO add config for quiet mode
		const t = this.time + new Date().getTime()
		console.log(`[Perf] ${this.name}: ${t / 1000}s`)
	}
}

export function tick(name) {
	return new Stopwatch(name)
}
