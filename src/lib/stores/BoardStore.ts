import { writable, type Writable } from 'svelte/store';

import type { Board, Square, Rank, File, Position } from "src/lib/models/Board";
import type { Piece } from "src/lib/models/Piece";
//@ts-ignore
import Rook from "/src/lib/components/pieces/Rook.svelte";
//@ts-ignore
import Bishop from "/src/lib/components/pieces/Bishop.svelte";
//@ts-ignore
import Knight from "/src/lib/components/pieces/Knight.svelte";
//@ts-ignore
import Queen from "/src/lib/components/pieces/Queen.svelte";
//@ts-ignore
import King from "/src/lib/components/pieces/King.svelte";
//@ts-ignore
import Pawn from "/src/lib/components/pieces/Pawn.svelte";
import { shallowEqual } from 'src/lib/helpers';

/* let boardSquares = [
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{},{}]
] */

const ranks: Rank[] = [0,1,2,3,4,5,6,7]
const files: File[] = [0,1,2,3,4,5,6,7]
export const board: Writable<Board> = writable(ranks.map((rank: Rank) => files.map(file => ({ position: {file,rank}, piece: null }) )).reverse()
                    .reduce((flattenedBoard, rank) => flattenedBoard.concat(rank), []))

export const cemetery: Writable<Piece[]> = writable([])

export const selectedPiece: Writable<Piece | null> = writable(null)

/******************************************************** METHODS ****************************/
function addPieceToBoard(piece: Piece, position: Position) {
    board.update(board => board.map(square => {
        if (shallowEqual(square.position, position)) {
            square.piece = piece
        }
        return square
    }))
}
export function addPendingMoves(positions: Position[], piece: Piece) {
    positions.forEach(position => {
        board.update(board => board.map(square => {
            if (shallowEqual(square.position, position)) {
                square.pendingMove = {piece}
            }
            return square
        }))
    })
}
export function clearPendingMoves() {
    board.update(board => board.map(square => {
        square.pendingMove = undefined
        return square
    }))
}
export function movePiece(piece: Piece, position: Position) {
    board.update(board => board.map(square => {
        if (square.piece?.id === piece.id) {
            square.piece = null
        }
        if (shallowEqual(square.position, position)) {
            // Put the piece in the cemetery if it's a capture
            if (square.piece) cemetery.update(cemetery => [...cemetery, {...square.piece!, alive: false}])
            square.piece = piece
        }
        return square
    }))
}

/******************************************************** INITIAL PIECES ****************************/

/* ROOKS */
addPieceToBoard({
    id: "white-rook-1",
    type: Rook,
    color: "white",
    alive: true,
}, {file: 0, rank: 0})
addPieceToBoard({
    id: "white-rook-2",
    type: Rook,
    color: "white",
    alive: true,
}, {file: 7, rank: 0})
addPieceToBoard({
    id: "black-rook-1",
    type: Rook,
    color: "black",
    alive: true,
}, {file: 0, rank: 7})
addPieceToBoard({
    id: "black-rook-2",
    type: Rook,
    color: "black",
    alive: true,
}, {file: 7, rank: 7})

/* BISHOPS */
addPieceToBoard({
    id: "white-bishop-1",
    type: Bishop,
    color: "white",
    alive: true,
}, {file: 1, rank: 0})
addPieceToBoard({
    id: "white-bishop-2",
    type: Bishop,
    color: "white",
    alive: true,
}, {file: 6, rank: 0})
addPieceToBoard({
    id: "black-bishop-1",
    type: Bishop,
    color: "black",
    alive: true,
}, {file: 1, rank: 7})
addPieceToBoard({
    id: "black-bishop-2",
    type: Bishop,
    color: "black",
    alive: true,
}, {file: 6, rank: 7})

/* KNIGHTS */
addPieceToBoard({
    id: "white-knight-1",
    type: Knight,
    color: "white",
    alive: true,
}, {file: 2, rank: 0})
addPieceToBoard({
    id: "white-knight-2",
    type: Knight,
    color: "white",
    alive: true,
}, {file: 5, rank: 0})
addPieceToBoard({
    id: "black-knight-1",
    type: Knight,
    color: "black",
    alive: true,
}, {file: 2, rank: 7})
addPieceToBoard({
    id: "black-knight-2",
    type: Knight,
    color: "black",
    alive: true,
}, {file: 5, rank: 7})

/* QUEENS */
addPieceToBoard({
    id: "white-queen",
    type: Queen,
    color: "white",
    alive: true,
}, {file: 3, rank: 0})
addPieceToBoard({
    id: "black-queen",
    type: Queen,
    color: "black",
    alive: true,
}, {file: 4, rank: 7})

/* Kings */
addPieceToBoard({
    id: "white-king",
    type: King,
    color: "white",
    alive: true,
}, {file: 4, rank: 0})
addPieceToBoard({
    id: "black-king",
    type: King,
    color: "black",
    alive: true,
}, {file: 3, rank: 7})

/* PAWNS */
for(let i = 0; i <= 7; i++){
    addPieceToBoard({
        id: `white-pawn-${i}`,
        type: Pawn,
        color: "white",
        alive: true,
    }, {file: i as File, rank: 1})
    addPieceToBoard({
        id: `black-pawn-${i}`,
        type: Pawn,
        color: "black",
        alive: true,
    }, {file: i as File, rank: 6})
}