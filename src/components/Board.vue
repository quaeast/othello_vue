<template>
    <div>
        <div class="container">
            <div v-for="(line, i) in statusMatrix" :key="line">
                <div v-for="(point, j) in line" :key="point">
                    <Token :color="colorMatrix[i][j]"
                           :token-status="point"
                           :position="[i,j]" v-on:onClickAndSendPosition="showPosition"></Token>
                </div>
            </div>
        </div>
        <div>
            <span>black: {{blackNum}} | </span>
            <span>white: {{whiteNum}} </span>
            <br><br>
            <span>Turn: {{currentPlayer===0?"black":"white"}}</span>
        </div>
    </div>
</template>

<script>
    import Token from "./Token";
    import axios from 'axios';

    function mapToColor(colorMatrix, enableMatrix) {
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
                if (enableMatrix[i][j] === 1) {
                    result[i][j] = "rgba(100,100,100,1)";
                }
            }
        }
        return result;
    }

    function mapToColorNum(curPlayer) {
        return curPlayer === 0 ? -1 : curPlayer;
    }


    const statusMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    // const zeroMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

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
                enableMatrix: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
                position: null,
                // 当前执棋者身份，0黑棋（-1），1白棋（1）
                currentPlayer: 0,
                step: 0,
            }
        },
        computed: {
            colorMatrix: function () {
                return mapToColor(this.statusMatrix, this.enableMatrix);
            },
            validLen: function () {
                let sum = 0;
                for (const line of this.enableMatrix) {
                    for (const point of line) {
                        if (point === 1) {
                            sum++;
                        }
                    }
                }
                return sum;
            },
            blackNum: function () {
                let sum = 0;
                for (const line of this.statusMatrix) {
                    for (const point of line) {
                        if (point === -1) {
                            sum++;
                        }
                    }
                }
                return sum;
            },
            whiteNum: function () {
                let sum = 0;
                for (const line of this.statusMatrix) {
                    for (const point of line) {
                        if (point === 1) {
                            sum++;
                        }
                    }
                }
                return sum;
            },
        },
        methods: {
            showPosition: function (data) {
                this.position = data;
            },
            AIRun: function () {
                const currentThis = this;
                if (this.playerStatus[this.currentPlayer] === 0) {
                    return;
                }
                if (this.validLen === 0) {
                    console.log("ai skip");
                    currentThis.currentPlayer = (1 + currentThis.currentPlayer) % 2;
                    currentThis.fetchValidPosition();
                    return;
                }
                console.log("ai run");
                axios.post(
                    'http://47.240.25.164:5000/prob',
                    {
                        "board": currentThis.statusMatrix,
                        "cur_player": mapToColorNum(currentThis.currentPlayer)
                    })
                    .then(function (response) {
                        axios.post(
                            'http://47.240.25.164:5000/next_state',
                            {
                                "board": currentThis.statusMatrix,
                                "cur_player": mapToColorNum(currentThis.currentPlayer),
                                "action": response.data["action"]
                            }
                        ).then(function (response) {
                            currentThis.statusMatrix = response.data["board"];
                            currentThis.currentPlayer = (1 + currentThis.currentPlayer) % 2;
                            currentThis.fetchValidPosition();
                        })
                    });
            },
            humanRun: function () {
                const currentThis = this;
                if (this.validLen === 0) {
                    console.log("human skip");
                    currentThis.currentPlayer = (1 + currentThis.currentPlayer) % 2;
                    currentThis.fetchValidPosition();
                    return;
                }
                if (this.playerStatus[this.currentPlayer] === 1) {
                    return;
                }
                if (this.enableMatrix[this.position[0]][this.position[1]] === 0) {
                    return;
                }
                console.log("human run");
                const action = this.position[0] * 8 + this.position[1];
                axios.post(
                    'http://47.240.25.164:5000/next_state',
                    {
                        "board": currentThis.statusMatrix,
                        "cur_player": mapToColorNum(currentThis.currentPlayer),
                        "action": action
                    }
                ).then(function (response) {
                    currentThis.statusMatrix = response.data["board"];
                    currentThis.currentPlayer = (1 + currentThis.currentPlayer) % 2;
                    currentThis.fetchValidPosition();
                })
            },
            fetchValidPosition: function () {
                const currentThis = this;
                currentThis.enableMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
                axios.post(
                    'http://47.240.25.164:5000/valid',
                    {
                        "board": currentThis.statusMatrix,
                        "cur_player": mapToColorNum(currentThis.currentPlayer),
                    }
                ).then(function (response) {
                    const validArray = response.data["valid_actions"];
                    for (const position of validArray) {
                        const x = position[0];
                        const y = position[1];
                        currentThis.enableMatrix[x][y] = 1;
                    }
                    console.log(currentThis.enableMatrix);
                    console.log(currentThis.validLen);
                    currentThis.step++;
                })
            }
        },
        watch: {
            step: function () {
                this.AIRun();
            },
            position: function () {
                this.humanRun();
            }
        },
        beforeCreate() {
        },
        created() {
            this.fetchValidPosition();
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
