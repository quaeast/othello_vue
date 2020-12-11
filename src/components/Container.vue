<script>
    import Board from "./Board";

    export default {
        name: "Container",
        components: {Board},
        data: function () {
            return {
                blackPlayer: 0,
                whitePlayer: 1,
            }
        },
        computed:{
            playerStatusWrapper: function () {
                return [this.blackPlayer, this.whitePlayer];
            }
        }
    }
</script>

<template>
    <div class="switch-wrapper">
        <span>Black </span>
        <el-switch
                active-color="#4199f6"
                inactive-color="#d5d7de"
                :active-value="1"
                :inactive-value="0"
                v-model="blackPlayer">
        </el-switch>
        <span>  White </span>
        <el-switch
                active-color="#4199f6"
                inactive-color="#d5d7de"
                :active-value="1"
                :inactive-value="0"
                v-model="whitePlayer">
        </el-switch>
    </div>
    <div class="boardWrapper">
        <Board :player-status="playerStatusWrapper"></Board>
    </div>
    <br>
    <span>如果人类死棋了，点一下棋盘</span>
    <br><br>
    <a class="copyright" href="https://github.com/quaeast/othello_vue" target="_blank">© fang zidong 2020 MIT LICENSE
        | </a>
    <a class="copyright" href="https://github.com/quaeast/alpha-zero-general" target="_blank">© Surag Nair 2018 MIT
        LICENSE</a>
</template>

<style scoped>
    .switch-wrapper {
        margin-bottom: 20px;
    }

    .boardWrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .copyright {
        text-decoration: none;
        font-size: 10px;
        color: #d5d7de;
    }
</style>
