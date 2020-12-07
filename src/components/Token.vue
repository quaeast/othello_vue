<template>
    <div class="grid">
        <div class="token"
             v-on:click="sendPositionToBoard"
             :style="{backgroundColor: color}"></div>
    </div>
</template>

<script>
    export default {
        name: "Token",
        props:{
            color: String,
            tokenStatus: Number,
            position: Array
        },
        methods:{
            sendPositionToBoard: function () {
                this.$emit("onClickAndSendPosition", this.position);
            }
        }
    }
</script>

<style scoped>
    .grid{
        border: 1px wheat solid;
        width: 48px;
        height: 48px;
    }

    .token{
        border: 0;
        margin: 2px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
    }
</style>
