<template>
    <span>选择模式 1 代表 AI，0 代表人。</span>
    <div>
        <input v-model="playerStatus[0]">
        <input v-model="playerStatus[1]">
    </div>
    <Board :playerStatus="playerStatus"></Board>
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

</style>
