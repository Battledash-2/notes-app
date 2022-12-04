<script>
	import { link, navigate } from 'svelte-routing';
	import { marked } from 'marked';

	export let tags;
	export let notes;
	export let params;

	const noteId = params.noteId;
	const note = $notes.find((c) => c.id === noteId);

	function deleteNote() {
		notes.update((prev) => prev.filter((n) => n.id !== noteId));
		navigate('../');
	}
</script>

<nav>
	<div class="d-flex w-100">
		<div class="d-flex vstack">
			<h2>{note.title}</h2>
			<div class="d-flex gap-1">
				{#each note.tags as tag}
					<div class="badge badge-pill bg-primary">
						{$tags.find((c) => c.key === tag)?.label}
					</div>
				{/each}
			</div>
		</div>
		<div class="d-flex gap-1 ms-auto">
			<a use:link href={`../edit/${noteId}/`}>
				<button class="btn btn-primary">Edit</button>
			</a>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a on:click={deleteNote}>
				<button class="btn btn-outline-danger">Delete</button>
			</a>
			<a use:link href="../">
				<button class="btn btn-outline-secondary">Back</button>
			</a>
		</div>
	</div>
	<hr />
</nav>
<main class="container">
	{@html marked(note.content)}
</main>
