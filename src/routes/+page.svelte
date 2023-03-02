<script>
    import Board from "src/lib/components/Board.svelte";
    import Cemetery from "src/lib/components/Cemetery.svelte";
</script>

<main class="min-h-screen flex flex-col justify-center">
    <Cemetery color="black" />
    <Board />
    <Cemetery color="white" />
</main>