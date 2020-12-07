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
    {{white}}
</template>

<script>
    import Token from "./Token";
    import axios from 'axios';
    import {Observable, Subject} from 'rxjs';


    Observable.ofProxyChanges = (target) => {
        let subject = new Subject;
        let proxy = new Proxy(target, {
            set(target, key, val) {
                target[key] = val;
                subject.next();
                return true;
            }
        });
        return [proxy, subject.asObservable()];
    }

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

    function AIRun() {
        axios.post(
            'http://localhost:8080/api/prob',
            {
                "board": statusMatrix,
                "cur_player": 1
            })
            .then(function (response) {
                console.log(response.data["action"]);
                axios.post(
                    'http://localhost:8080/api/next_state',
                    {
                        "board": statusMatrix,
                        "cur_player": 1,
                        "action": response.data["action"]
                    }
                ).then(function (response) {
                    console.log(response.data["board"]);
                    statusMatrix = response.data["board"];
                })
            });

    }

    let statusMatrix = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    let [positionContainer, positionChange$] = Observable.ofProxyChanges({});
    positionChange$.subscribe({
        next: function () {
            AIRun();
        }
    });

    let white = "white";

    setTimeout(()=>{
        white = "black";
        console.log(white);
    }, 2000)


    export default {
        name: "Board",
        components: {
            Token
        },
        methods: {
            showPosition: function (data) {
                positionContainer.position = data;
                // console.log(data);
            }
        },
        data: function () {
            return {
                statusMatrix: statusMatrix,
                colorMatrix: mapToColor(statusMatrix),
                white: white
            }
        },
        beforeCreate() {
            console.log(statusMatrix);
            axios.post(
                'http://localhost:8080/api/prob',
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
