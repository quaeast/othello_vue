<template>
    <Container></Container>
</template>

<script>
    import Container from "./components/Container";

    export default {
        name: 'App',
        components: {
            Container,
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
