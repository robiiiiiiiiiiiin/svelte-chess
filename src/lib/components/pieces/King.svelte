<script lang="ts">
    import BasePiece from "./BasePiece.svelte";
    import {board} from "src/lib/stores/BoardStore";
    import type { Position, Square, File, Rank } from "src/lib/models/Board";
    import type { Piece } from "src/lib/models/Piece";

    export let piece: Piece;

    const methods = {
        getAvailableMoves: (currentPosition: Position): Position[] => {

            let availablePositionsToMove: Position[] = [
                {file: currentPosition.file + 1 as unknown as File, rank: currentPosition.rank + 1 as unknown as Rank},
                {file: currentPosition.file + 1 as unknown as File, rank: currentPosition.rank - 1 as unknown as Rank},
                {file: currentPosition.file - 1 as unknown as File, rank: currentPosition.rank + 1 as unknown as Rank},
                {file: currentPosition.file - 1 as unknown as File, rank: currentPosition.rank - 1 as unknown as Rank},
                {file: currentPosition.file + 1 as unknown as File, rank: currentPosition.rank as unknown as Rank},
                {file: currentPosition.file as unknown as File, rank: currentPosition.rank + 1 as unknown as Rank},
                {file: currentPosition.file - 1 as unknown as File, rank: currentPosition.rank as unknown as Rank},
                {file: currentPosition.file as unknown as File, rank: currentPosition.rank - 1 as unknown as Rank},
            ]
            // Remove positions outside of the board or where there is a piece of the same color
            .filter(position => {
                const square = $board.find(square => square.position.file === position.file && square.position.rank === position.rank)
                if(!square) return false
                if(square.piece && square.piece.color === piece.color) return false
                else return true
            })
            
            return availablePositionsToMove      
        }
    }

</script>

<BasePiece name="king" {piece} {methods} />
