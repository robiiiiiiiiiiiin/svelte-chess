<script lang="ts">
    import type { Position } from "src/lib/models/Board";
    import type { Piece } from "src/lib/models/Piece";
    import {addPendingMoves, clearPendingMoves, board, selectedPiece} from "src/lib/stores/BoardStore";
    import { capitalizeFirstLetter } from "src/lib/helpers";

    import BishopBlack from "src/lib/components/icons/BishopBlack.svelte";
    import BishopWhite from "src/lib/components/icons/BishopWhite.svelte";
    import RookBlack from "src/lib/components/icons/RookBlack.svelte";
    import RookWhite from "src/lib/components/icons/RookWhite.svelte";
    import KnightBlack from "src/lib/components/icons/KnightBlack.svelte";
    import KnightWhite from "src/lib/components/icons/KnightWhite.svelte";
    import KingBlack from "src/lib/components/icons/KingBlack.svelte";
    import KingWhite from "src/lib/components/icons/KingWhite.svelte";
    import QueenBlack from "src/lib/components/icons/QueenBlack.svelte";
    import QueenWhite from "src/lib/components/icons/QueenWhite.svelte";
    import PawnBlack from "src/lib/components/icons/PawnBlack.svelte";
    import PawnWhite from "src/lib/components/icons/PawnWhite.svelte";

    export let name: string;
    export let piece: Piece;
    export let methods: {
        getAvailableMoves: (currentPosition: Position) => Position[];
    };

    const icons = { BishopBlack, BishopWhite, RookBlack, RookWhite, KnightBlack, KnightWhite, KingBlack, KingWhite, QueenBlack, QueenWhite, PawnBlack, PawnWhite };
    $: iconComponentName = capitalizeFirstLetter(name) + capitalizeFirstLetter(piece.color);
    // @ts-ignore
    $: iconComponent = icons[iconComponentName];

    let button: HTMLButtonElement;
    $: invertedColor = piece.color === "white" ? "black" : "white";
    $: selected = $selectedPiece != null && $selectedPiece.id === piece.id;

    function getPositionOnBoard(): Position | false {
        const currentSquare = $board.find(square => square.piece === piece)
        return currentSquare ? {file: currentSquare.position.file, rank: currentSquare.position.rank} : false
    }

    function selectPiece() {
        console.log("selectPiece()")
        clearPendingMoves()
        selectedPiece.set(piece)
        // Add listener to unselect the piece when clicking outside
        function unSelectOnClickOutside(e: MouseEvent) {
            console.log("unSelectOnClickOutside()")
            const target = e.target as Element
            if(!target.classList.contains('piece')) {
                unSelectPiece()
                document.removeEventListener('click', unSelectOnClickOutside)
            }
        }
        document.addEventListener('click', unSelectOnClickOutside)

        const currentPosition = getPositionOnBoard()
        if (!currentPosition) {
            console.error("Couldn't getPositionOnBoard()")
            return false
        }

        // Determine the positions where the piece can move according to its rules
        let availablePositionsToMove = methods.getAvailableMoves(currentPosition)

        // Highlight the squares where the piece can move
        addPendingMoves(availablePositionsToMove, piece)
    }
    function unSelectPiece() {
        selectedPiece.set(null)
        clearPendingMoves()
    }
</script>


<button bind:this={button} type="button" aria-label="{name}-{piece.color}" class:selected class="piece w-full h-full flex justify-center items-center" on:click|self={selected ? unSelectPiece : selectPiece} disabled={!piece.alive}>
    <svelte:component this={iconComponent} class="pointer-events-none scale-[1.8]" />
</button>


<style lang="scss">
</style>