<script>
	import { link, navigate } from 'svelte-routing';
	import { Select } from 'svselect';
	import { v4 } from 'uuid';
	import { writable } from 'svelte/store';

	export let notes;
	export let tags;

	let selTags = writable([]);

	let title = '';
	let content = '';

	function save() {
		let note = {
			title,
			content,
			id: v4(),
		};

		let noteTags = [];
		for (let tag of $selTags) {
			noteTags.push(tag.key);
			if (tag.custom && !$tags.some((c) => c.key === tag.key)) {
				tags.update((c) => c.push(tag) && c);
			}
			tag.custom = false;
		}

		note.tags = noteTags;
		notes.update((c) => c.push(note) && c);

		navigate('./');
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
		<h2>Create Note</h2>
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
		<a href="./" use:link style="flex: 1;">
			<button class="btn btn-outline-secondary flex w-100">Back</button>
		</a>
	</div>
</main>

<!-- use the css from Dashboard.svelte :) -->
<!-- ok -->
