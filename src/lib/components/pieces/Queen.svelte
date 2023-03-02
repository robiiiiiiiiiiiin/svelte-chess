<script lang="ts">
    import BasePiece from "./BasePiece.svelte";
    import {board} from "src/lib/stores/BoardStore";
    import type { Position, Square } from "src/lib/models/Board";
    import type { Piece } from "src/lib/models/Piece";

    export let piece: Piece;

    const methods = {
        getAvailableMoves: (currentPosition: Position): Position[] => {

            let availablePositionsToMove: Position[] = []
            
            // Add position to availablePositionsToMove and return true if there is no available move further
            function addMoveOrBreak(square: Square | undefined): boolean{
                if(!square) return true
                if(square.piece) {
                    if(square.piece.color !== piece.color) availablePositionsToMove.push(square.position)
                    return true
                }
                else availablePositionsToMove.push(square.position)
                return false
            }

            /******* ROOK COPYCAT ******/

            // Get available moves to the right
            for(let file = currentPosition.file + 1; file <= 7; file++) {
                const square = $board.find(square => square.position.file === file && square.position.rank === currentPosition.rank)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }
            // Get available moves to the left
            for(let file = currentPosition.file - 1; file >= 0; file--) {
                const square = $board.find(square => square.position.file === file && square.position.rank === currentPosition.rank)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }
            // Get available moves to the bottom
            for(let rank = currentPosition.rank + 1; rank <= 7; rank++) {
                const square = $board.find(square => square.position.file === currentPosition.file && square.position.rank === rank)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }
            // Get available moves to the top
            for(let rank = currentPosition.rank - 1; rank >= 0; rank--) {
                const square = $board.find(square => square.position.file === currentPosition.file && square.position.rank === rank)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }

            /******* BISHOP COPYCAT ******/

            // Get available moves up right
            for(let i = 1; i <= 7; i++) {
                const square = $board.find(square => square.position.file === currentPosition.file + i && square.position.rank === currentPosition.rank + i)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }
            // Get available moves up left
            for(let i = 1; i <= 7; i++) {
                const square = $board.find(square => square.position.file === currentPosition.file - i && square.position.rank === currentPosition.rank + i)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }
            // Get available moves down right
            for(let i = 1; i <= 7; i++) {
                const square = $board.find(square => square.position.file === currentPosition.file + i && square.position.rank === currentPosition.rank - i)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }
            // Get available moves down left
            for(let i = 1; i <= 7; i++) {
                const square = $board.find(square => square.position.file === currentPosition.file - i && square.position.rank === currentPosition.rank - i)
                const shouldBreak = addMoveOrBreak(square)
                if(shouldBreak) break
            }

            return availablePositionsToMove      
        }
    }

</script>

<BasePiece name="queen" {piece} {methods} />
