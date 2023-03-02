<script lang="ts">
    import BasePiece from "./BasePiece.svelte";
    import {board} from "src/lib/stores/BoardStore";
    import type { Position, Square, File, Rank } from "src/lib/models/Board";
    import type { Piece } from "src/lib/models/Piece";

    export let piece: Piece;

    const methods = {
        getAvailableMoves: (currentPosition: Position): Position[] => {

            const direction = piece.color === "white" ? 1 : -1
            const hasMoved = (piece.color === "white" && currentPosition.rank !== 1) || (piece.color === "black" && currentPosition.rank !== 6)
            let availablePositionsToMove: Position[] = []

            // Move forward
            const forwardSquare = [
                $board.find(square => square.position.file === currentPosition.file && square.position.rank === currentPosition.rank + direction)
            ].filter(square => square && !square.piece)
            // Move forward twice if the piece has not moved yet and if there is room to move
            const doubleForwardSquare = !hasMoved && forwardSquare.length === 1 ? [$board.find(square => square.position.file === currentPosition.file && square.position.rank === currentPosition.rank + 2 * direction)].filter(square => square && !square.piece) : []
            
            // Eat moves
            const eatSquares = [
                $board.find(square => square.position.file === currentPosition.file - 1 && square.position.rank === currentPosition.rank + direction),
                $board.find(square => square.position.file === currentPosition.file + 1 && square.position.rank === currentPosition.rank + direction)
            ].filter(square => square && square.piece && square.piece.color !== piece.color)
            
            // Merge all available positions
            availablePositionsToMove = [...forwardSquare, ...doubleForwardSquare, ...eatSquares].map(square => square!.position)
            
            return availablePositionsToMove      
        }
    }

</script>

<BasePiece name="pawn" {piece} {methods} />
