<script lang="ts">
    import type { Square } from "src/lib/models/Board";
    import { movePiece, selectedPiece } from "../stores/BoardStore";

    export let square: Square;

    $: selected = $selectedPiece != null && square.piece && $selectedPiece.id === square.piece.id;

    const filesAsLetters: string[] = ["a","b","c","d","e","f","g","h"]

    function makePendingMove() {
        if(!square.pendingMove) return;
        movePiece(square.pendingMove.piece, square.position)
    }
</script>

<div class:selected class="{square.position.rank%2 === 0 ? "alternate-colors" : ""} square relative w-full h-full">
    <div class="absolute bottom-[4px] left-[4px] text-xs">{filesAsLetters[square.position.file].toUpperCase()}{square.position.rank + 1}</div>
    {#if square.piece}
        <div class="piece-wrapper w-full h-full flex justify-center items-center ">
            <svelte:component this={square.piece.type} piece={square.piece} />
        </div>
    {/if}
    {#if square.pendingMove}
        <button type="button" class="pending-move absolute top-0 left-0 w-full h-full flex justify-center items-center" on:click={makePendingMove}>
            {#if square.piece}
                <div class="icon rounded-full border-[7px] w-[97px] h-[97px]" ></div>
            {:else}
                <div class="icon rounded-full w-[40px] h-[40px]"></div>
            {/if}
        </button>
    {/if}
</div>

<style lang="scss">
    .square {
        &:nth-child(even), &.alternate-colors:nth-child(odd) {
            background-color: #769656;
            color: #ececec;
            &.selected {
                background-color: #BBCA3D;
            }
        }
        &:nth-child(odd), &.alternate-colors:nth-child(even) {
            background-color: #EEEED2;
            color: #777777;
            &.selected {
                background-color: #F6F67E;
            }
        }
        .pending-move {
            .icon {
                background-color: rgba(0,0,0,.1);
                border-color: rgba(0,0,0,.1);
            }
            &:hover .icon {
                background-color: rgba(0,0,0,.2);
                border-color: rgba(0,0,0,.2);
            }
        }
    }
</style>