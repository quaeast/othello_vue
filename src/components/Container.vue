<template>
    <span>选择模式 1 代表 AI，0 代表人。</span>
    <div>
        <span>黑 </span>
        <input v-model="playerStatus[0]">
        <br>
        <span>白 </span>
        <input v-model="playerStatus[1]">
    </div>
    <div class="boardWrapper">
        <Board :playerStatus="playerStatus"></Board>
    </div>
</template>

<script>
    import Board from "./Board";


    export default {
        name: "Container",
        components: {Board},
        data: function () {
            return {
                playerStatus: [0, 1]
            }
        }
    }
</script>

<style scoped>
    .boardWrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
