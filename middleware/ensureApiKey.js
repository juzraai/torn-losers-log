export default function ({ store, redirect }) {
	if (!store.state.settings.apiKey) { // TODO: bug, runs before layout::mounted, so it never finds API key...
		return redirect('/connect');
	}
};
