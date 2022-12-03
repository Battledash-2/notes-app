<script>
	import { link } from 'svelte-routing';

	export let notes;
	export let tags;
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
				class="btn btn-primary">Edit Tags</button
			>
		</div>
	</div>
	<hr />
</nav>

<main
	class="d-flex gap-2 row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1"
>
	{#each $notes as note}
		<!-- {JSON.stringify(note)} -->
		<a
			use:link
			style="color: inherit;"
			class="text-decoration-none"
			href={`./view/${note.id}`}
		>
			<div
				class="card text-decoration-none h-100 col align-items-center justify-content-center h-100 vstack gap-2 minBreakpoint-xs w-100 text-decoration-none item card-body"
			>
				<h4>{note.title}</h4>
				<div class="d-flex gap-1">
					{#each note.tags as tag}
						<div class="badge badge-pill bg-primary">
							{$tags.find((c) => c.key === tag)?.label}
						</div>
					{/each}
				</div>
			</div>
		</a>
	{/each}
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
