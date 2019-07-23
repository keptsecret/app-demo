<template>
    <button type="button" class="reset" @click="resetPage()">NEXT</button>
</template>


<script>
export default {
    name: "Reset",

    methods: {
        resetPage: function() {
            this.$emit("call-reset");
        }
    }
};
</script>

<style lang="scss">
.reset {
    margin: 10px;
    color: #c72f2f;
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    background-color: white;
    padding: 18px;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border-radius: 5px;
    border: 5px solid #c72f2f;

    &:active {
        background: #FF9900;
    }
}
</style>

