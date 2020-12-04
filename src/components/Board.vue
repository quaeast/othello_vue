<template>
    <Token color="black"></Token>
    <Token color="black"></Token>
    <Token color="black"></Token>
</template>

<script>
    import Token from "./Token";
    import axios from 'axios'

    export default {
        name: "Board",
        components: {
            Token
        },
        created() {
            axios.post(
                'http://localhost:8080/api/prob',
                {
                    "board": [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]],
                    "cur_player": 1
                })
                .then(function (response) {
                    alert(response.data);
                })
                .catch(function (error) {
                    alert(error);
                });
        }
    }
</script>

<style scoped>

</style>
