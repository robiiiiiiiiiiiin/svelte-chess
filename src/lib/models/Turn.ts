import type { Position } from "./Board"
import type { Piece } from "./Piece";

export interface Turn {
    from: {
        piece: Piece;
        position: Position;
    },
    to: {
        piece: Piece;
        position: Position;
    }
}