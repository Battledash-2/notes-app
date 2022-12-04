<script>
	import { link } from 'svelte-routing';
	import { writable } from 'svelte/store';
	import { Select } from 'svselect';

	export let notes;
	export let tags;

	let searchTitle = '';
	let searchTags = writable([]);

	function getFilteredNotes() {
		return $notes.filter(
			(c) =>
				c.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
				($searchTags.length > 0
					? c.tags.length > 0
						? c.tags.some((o) =>
								$searchTags.some((v) => v.key === o)
						  )
						: false
					: true)
		);
	}

	let filteredNotes = getFilteredNotes();
	$: notes, searchTitle, searchTags, (filteredNotes = getFilteredNotes());
</script>

<nav>
	<div class="d-flex w-100">
		<h2>Notes</h2>
		<div class="d-flex gap-1 ms-auto">
			<a style="height: 100%;" href="./create" use:link>
				<button style="height: 100%;" class="btn btn-primary"
					>Create</button
				>
			</a>
			<button
				data-bs-toggle="modal"
				data-bs-target="#editTags"
				class="btn btn-outline-secondary">Edit Tags</button
			>
		</div>
	</div>
</nav>

<div class="d-flex gap-2 mb-2">
	<div class="d-flex vstack" style="flex: 1;">
		<label for="title">Title</label>
		<input bind:value={searchTitle} id="title" class="form-control" />
	</div>
	<div class="d-flex vstack" style="flex: 1;">
		<label for="tag">Tags</label>
		<Select
			selected={searchTags}
			options={[...$tags]}
			multiple
			hideselected
		/>
	</div>
</div>

<hr />

<main>
	<div class="g-3 row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
		{#each filteredNotes as note}
			<div class="col">
				<a
					class="item h-100 text-reset text-decoration-none _card_16vt5_1 card"
					href={`./view/${note.id}`}
					use:link
				>
					<div class="card-body">
						<div
							class="align-items-center justify-content-center
								h-100 vstack gap-2 minBreakpoint-xs"
						>
							<span class="fs-5">{note.title}</span>
							<div
								class="justify-content-center flex-wrap hstack gap-1
									minBreakpoint-xs"
							>
								{#each note.tags as tag}
									<span class="text-truncate badge bg-primary"
										>{$tags.find((c) => c.key === tag)
											.label}</span
									>
								{/each}
							</div>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</main>

{#if false} <span class="item" /> {/if}

<div
	class="modal fade"
	id="editTags"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">
					Edit Tags
				</h1>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
				/>
			</div>
			<div class="modal-body d-flex vstack gap-1">
				{#each $tags as tag}
					<div class="d-flex gap-1">
						<input class="form-control" bind:value={tag.label} />
						<button
							on:click={() => {
								notes.update(
									(prev) =>
										prev.map((c) => {
											if (c.tags.includes(tag.key))
												c.tags = c.tags.filter(
													(c) => c !== tag.key
												);
										}) && prev
								);
								tags.update((prev) =>
									prev.filter((c) => c !== tag)
								);
							}}
							class="btn">&times;</button
						>
					</div>
				{/each}
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-secondary"
					data-bs-dismiss="modal">Close</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	.item {
		transition: translate ease-in-out 100ms, box-shadow ease-in-out 100ms;
	}

	.item:hover,
	.item:focus {
		translate: 0 -2px;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
	}
</style>
