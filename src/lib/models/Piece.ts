import type { SvelteComponent } from "svelte";

export type Color = "white" | "black";

export type Piece = {
    id: string;
    type: typeof SvelteComponent;
    color: Color;
    alive: boolean;
};