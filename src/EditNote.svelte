<script>
	import { link, Link, navigate } from 'svelte-routing';
	import { Select } from 'svselect';
	import { v4 } from 'uuid';
	import { writable } from 'svelte/store';

	export let notes;
	export let tags;
	export let params;

	const noteId = params.noteId;
	const note = $notes.find((c) => c.id === noteId);

	let selected = [];
	for (let tagId of note.tags) {
		let tag = $tags.find((c) => c.key === tagId);
		if (tag != null) selected.push($tags.find((c) => c.key === tagId));
	}

	let selTags = writable(selected);

	let title = note.title;
	let content = note.content;

	function save() {
		let note = {
			title,
			content,
			id: noteId,
		};

		let noteTags = [];
		for (let tag of $selTags) {
			noteTags.push(tag.key);
			if (tag.custom && !$tags.some((c) => c.key === tag.key)) {
				tag.custom = false;
				tags.update((c) => c.push(tag) && c);
			}
			tag.custom = false;
		}

		note.tags = noteTags;
		console.log(note);
		notes.update((c) =>
			c.map((c) => {
				console.log(c.id, noteId);
				if (c.id === noteId) return note;
				return c;
			})
		); // (c.id === noteId ? note : c)) && c);

		navigate('../../');
	}

	function tagSelect(_, newv) {
		// if ($tags.some(c => c.key === newv.key)) return;

		return !$tags.some((c) => c.key === newv.key)
			? {
					// @ts-ignore
					label: newv.label,
					key: v4(),
			  }
			: newv;
	}
</script>

<nav>
	<div class="d-flex">
		<h2>Edit Note</h2>
	</div>
	<hr />
</nav>

<main class="d-flex vstack gap-2">
	<div class="d-flex gap-2">
		<div class="d-flex vstack" style="flex: 1;">
			<label for="title">Title</label>
			<input bind:value={title} id="title" class="form-control" />
		</div>
		<div class="d-flex vstack" style="flex: 1;">
			<label for="tag">Tags</label>
			<Select
				options={[...$tags]}
				onChange={tagSelect}
				selected={selTags}
				multiple
				hideselected
				allowcreate
				id="tag"
			/>
		</div>
	</div>
	<div class="d-flex vstack mb-2">
		<label for="content">Content</label>
		<textarea
			bind:value={content}
			style="height: 25vh;"
			id="content"
			class="form-control"
		/>
	</div>
	<div class="d-flex gap-2">
		<button on:click={save} class="btn btn-primary" style="flex: 1;"
			>Save</button
		>
		<a href="../../" use:link style="flex: 1;">
			<button class="btn btn-outline-secondary flex w-100">Back</button>
		</a>
	</div>
</main>

<!-- use the css from Dashboard.svelte :) -->
<!-- ok -->
