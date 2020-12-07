<template>
    <div class="container">
        <div v-for="(line, i) in statusMatrix" :key="line">
            <div v-for="(point, j) in line" :key="point">
                <Token :color="colorMatrix[i][j]"
                       :token-status="point"
                       :position="[j,i]" v-on:onClickAndSendPosition="showPosition"></Token>
            </div>
        </div>
    </div>
</template>

<script>
    import Token from "./Token";
    import axios from 'axios';


    function mapToColor(colorMatrix) {
        let result = new Array(8);
        for (let i = 0; i < 8; i++) {
            result[i] = new Array(8);
            for (let j = 0; j < 8; j++) {
                if (colorMatrix[i][j] === -1) {
                    result[i][j] = "rgba(0,0,0,1)";
                } else if (colorMatrix[i][j] === 1) {
                    result[i][j] = "rgba(255,255,255,1)";
                } else {
                    result[i][j] = "rgba(255,255,255,0)";
                }
            }
        }
        return result;
    }

    class Arena {
        constructor(player1, player2, board) {
            this.players = Object;
            this.players[-1] = player1;
            this.players[1] = player2;
            this.board = board;
        }

        play() {

        }
    }

    //TODO: 从 showPosition() 那里取回 position
    // 或许可以参考这 https://zhuanlan.zhihu.com/p/53618435
    function humanPlayer(board, curPlayer) {

        axios.post(
            'http://0.0.0.0:8080/api/prob',
            {
                "board": board,
                "cur_player": curPlayer
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    let statusMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    let arena = new Arena();



    export default {
        name: "Board",
        components: {
            Token
        },
        methods: {
            showPosition: function (data) {
                console.log(data);
            }
        },
        data: function () {
            return {
                statusMatrix: statusMatrix,
                colorMatrix: mapToColor(statusMatrix),
                white: "white"
            }
        },
        beforeCreate() {
            console.log(statusMatrix);
            axios.post(
                'http://0.0.0.0:8080/api/prob',
                {
                    "board": [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
                    "cur_player": 1
                })
                .then(function (response) {
                    console.log(response.data);
                    // alert(response.data);
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }
</script>

<style scoped>
    .container {
        background-color: #42b983;
        width: 400px;
        height: 400px;
        display: grid;
        grid-template-columns: repeat(auto-fill, 12.5%);
        grid-template-rows: repeat(auto-fill, 12.5%);
    }
</style>
