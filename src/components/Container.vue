<template>
    <div class="switch-wrapper">
        <span>Black </span>
        <el-switch
                active-color="#4199f6"
                inactive-color="#d5d7de"
                v-model="blackPlayer">
        </el-switch>
        <span>  White </span>
        <el-switch
                active-color="#4199f6"
                inactive-color="#d5d7de"
                v-model="whitePlayer">
        </el-switch>
    </div>
    <div class="boardWrapper">
        <Board :playerStatus="playerStatus"></Board>
    </div>
    <br>
    <a href="https://github.com/quaeast/othello_vue" target="_blank">© fang zidong | MIT LICENSE</a>
</template>

<script>
    import Board from "./Board";


    export default {
        name: "Container",
        components: {Board},
        data: function () {
            return {
                blackPlayer: false,
                whitePlayer: true,
            }
        },
        computed: {
            playerStatus: function () {
                return [this.blackPlayer ? 1 : 0, this.whitePlayer ? 1 : 0];
            }
        }
    }
</script>

<style scoped>
    .switch-wrapper {
        margin-bottom: 20px;
    }

    .boardWrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        color: #d5d7de;
    }

    a{
        text-decoration: none;
        color: gray;
    }
</style>
