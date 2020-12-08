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

    let statusMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

    export default {
        name: "Board",
        components: {
            Token
        },
        props: {
            // example: [1, 0] 1 for ai and 0 for human
            playerStatus: Array
        },
        data: function () {
            return {
                statusMatrix: statusMatrix,
                position: null,
                // 当前执棋者身份，0黑棋（-1），1白棋（1）
                currentPlayer: null,
            }
        },
        computed:{
            colorMatrix: function () {
                return mapToColor(this.statusMatrix);
            },
        },
        methods: {
            showPosition: function (data) {
                this.position = data;
                console.log(data);
            },
            AIRun: function () {
                console.log("AI run");
                if (this.playerStatus[this.currentPlayer]===0){
                    return;
                }
                const currentThis = this;
                console.log(currentThis.statusMatrix);
                axios.post(
                    'http://localhost:8080/api/prob',
                    {
                        "board": currentThis.statusMatrix,
                        "cur_player": 1
                    })
                    .then(function (response) {
                        console.log(response.data["action"]);
                        axios.post(
                            'http://localhost:8080/api/next_state',
                            {
                                "board": currentThis.statusMatrix,
                                "cur_player": 1,
                                "action": response.data["action"]
                            }
                        ).then(function (response) {
                            currentThis.statusMatrix = response.data["board"];
                        })
                    });
            },
            humanRun: function () {
                console.log("human run");
                if (this.playerStatus[this.currentPlayer]===1){
                    return;
                }
            }
        },
        watch:{
            position: function () {
                this.AIRun();
                this.humanRun();
            }
        },
        beforeCreate() {
        },
        created() {
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
