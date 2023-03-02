<script lang="ts">
    import type { Square } from "src/lib/models/Board";
    import { movePiece } from "../stores/BoardStore";

    export let square: Square;

    const filesAsLetters: string[] = ["a","b","c","d","e","f","g","h"]

    function makePendingMove() {
        if(!square.pendingMove) return;
        movePiece(square.pendingMove.piece, square.position)
    }
</script>

<div class="{square.position.rank%2 === 0 ? "alternate-colors" : ""} square relative w-full h-full">
    <div class="absolute bottom-[4px] left-[4px] text-xs">{filesAsLetters[square.position.file].toUpperCase()}{square.position.rank + 1}</div>
    {#if square.piece}
        <div class="piece-wrapper w-full h-full flex justify-center items-center ">
            <svelte:component this={square.piece.type} piece={square.piece} />
        </div>
    {/if}
    {#if square.pendingMove}
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            {#if square.piece}
                <button class="rounded-full border-[7px] border-cyan-500 hover:border-teal-500 w-[97px] h-[97px]" on:click={makePendingMove}></button>
            {:else}
                <button class="bg-cyan-500 hover:bg-teal-500 rounded-full w-[40px] h-[40px]" on:click={makePendingMove}></button>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    .square {
        &:nth-child(even), &.alternate-colors:nth-child(odd) {
            background-color: black;
            color: #777777;
        }
        &:nth-child(odd), &.alternate-colors:nth-child(even) {
            background-color: white;
            color: #777777;
        }
    }
</style>