<script lang="ts">
    import {cemetery} from "src/lib/stores/BoardStore";
    import type {Color} from "src/lib/models/Piece";

    export let color: Color;

    $: deadPieces = $cemetery.filter(piece => piece.color === color);
</script>

<section>
    <div class="w-[800px] py-[30px] min-h-[106px] m-auto flex justify-start">
        {#each deadPieces as piece}
            <svelte:component this={piece.type} piece={piece} />
        {/each}
    </div>
</section>