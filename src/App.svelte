<script>
	import { get } from "./hooks/localStorage";
	import { Router, Route } from 'svelte-routing';
	import Dashboard from './Dashboard.svelte';
    import CreateNote from './CreateNote.svelte';
    import ViewNote from './ViewNote.svelte';
    import EditNote from './EditNote.svelte';

	let notes = get('notes', []);
	let tags = get('tags', []);

	const urlState = location.hash;
	if (urlState) {
		console.log('detected state');
		history.replaceState(null, null, urlState.slice(1));
	}
</script>

<div class="container my-3">
	<Router>
        <Route path="view/:noteId" let:params><ViewNote {params} {notes} {tags} /></Route>
        <Route path="edit/:noteId" let:params><EditNote {params} {notes} {tags} /></Route>
        <Route path="create"><CreateNote {notes} {tags} /></Route>

		<Route path="notes-app/view/:noteId" let:params><ViewNote {params} {notes} {tags} /></Route>
        <Route path="notes-app/edit/:noteId" let:params><EditNote {params} {notes} {tags} /></Route>
        <Route path="notes-app/create"><CreateNote {notes} {tags} /></Route>
		
		<Route path=""><Dashboard {notes} {tags} /></Route>
	</Router>
</div>