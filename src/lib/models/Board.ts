import type { Piece } from "./Piece";

export type Rank = 0|1|2|3|4|5|6|7;
export type File = 0|1|2|3|4|5|6|7;

export interface Square {
    position: Position;
    piece: Piece | null;
    pendingMove?: PendingMove;
}

export type Board = Square[];

export type Position = {
    rank: Rank;
    file: File;
};

export type PendingMove = {
    piece: Piece;
}