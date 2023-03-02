<script lang="ts">
    import type { Position } from "src/lib/models/Board";
    import type { Piece } from "src/lib/models/Piece";
    import {addPendingMoves, clearPendingMoves, board, selectedPiece} from "src/lib/stores/BoardStore";

    export let name: string;
    export let piece: Piece;
    export let methods: {
        getAvailableMoves: (currentPosition: Position) => Position[];
    };

    let button: HTMLButtonElement;
    $: invertedColor = piece.color === "white" ? "black" : "white";
    $: selected = $selectedPiece != null && $selectedPiece.id === piece.id;

    function getPositionOnBoard(): Position | false {
        const currentSquare = $board.find(square => square.piece === piece)
        return currentSquare ? {file: currentSquare.position.file, rank: currentSquare.position.rank} : false
    }

    function selectPiece() {
        clearPendingMoves()
        selectedPiece.set(piece)
        // Add listener to unselect the piece when clicking outside
        function unSelectOnClickOutside(e: MouseEvent) {
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


<button bind:this={button} class:selected class="piece p-[10px] text-{invertedColor} border border-{invertedColor} bg-{piece.color} rounded-full" on:click={selected ? unSelectPiece : selectPiece} disabled={!piece.alive}>{name.toUpperCase()}</button>


<style lang="scss">
    .piece {
        &.selected {
            background-color: theme('colors.cyan.500');
        }
    }
</style>