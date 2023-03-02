<script lang="ts">
    import Square from "src/lib/components/Square.svelte";
    import {board} from "src/lib/stores/BoardStore";
</script>

<section class="">
    <div class="flex justify-center items-center">
        <div class="board grid grid-cols-8 grid-rows-8 w-[800px] h-[800px] border border-black gap-[1px] bg-black">
            {#each $board as square (square.position.file.toString() + square.position.rank.toString())}
                <Square {square} />
            {/each}
        </div>
    </div>
</section>