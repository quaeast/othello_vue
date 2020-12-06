<template>
    <div class="token"
         v-on:click="sendPositionToBoard"
         :style="{backgroundColor: color}"></div>
</template>

<script>
    export default {
        name: "Token",
        props:{
            color: String,
        },
        methods:{
            sendPositionToBoard: function () {
                this.$emit("onClickAndSendPosition", "position");
            }
        }
    }
</script>

<style scoped>
    .token{
        border: 0;
        padding: 0;
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
</style>
