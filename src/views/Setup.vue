<template>
    <div>
        <div>
            <h2>Use this page to choose the set of photos you want the AI to guess</h2>
        </div>
        <div>
            <input type="file" multiple name="upload" id="file">
            <button type="button" @click="sendImage()">Upload Images</button>
        </div>
        <transition name="access-app">
            <div v-if="checkUpload" style="margin: 10px">
                <h3 id="message">Now you can use the app</h3>
                <button type="button" @click="upSuccess()">Go to App Page</button>
            </div>
        </transition>
    </div>
</template>

<script>
//import { request } from 'http';

export default {

    data: function() {
        return {
            checkUpload: false,
        }
    },

    methods: {

        sendImage: function() {
            localStorage.clear();
            var imgFiles = document.getElementById('file').files;
            localStorage.setItem("length", imgFiles.length);

            //debugger; let has to be used in this case, something something to do with scopes
            for (var i = 0; i < imgFiles.length; i++) {
                let file = imgFiles[i];
                let name = "image" + i;
                let reader = new FileReader();
                reader.onload = function(e) {
                    let result = e.target.result;
                    localStorage.setItem(name, result);
                }
                reader.readAsDataURL(file);
            }

            this.checkUpload = true;
        },

        upSuccess: function() {
            console.log(localStorage.length);
            if (document.getElementById('file').files.length !== (localStorage.length - 1) || document.getElementById('file').files.length == 0) {
                this.upFail();
                return;
            }
            localStorage.setItem("upload", this.checkUpload);
            this.$router.replace(this.$route.query.redirect || '/app');
        },

        upFail: function() {
            localStorage.clear();
            this.checkUpload = false;
            document.getElementById('message').innerHTML = "Please try to upload photos again or choose some photos";
            localStorage.setItem("upload", this.checkUpload);
        },

    },

    created() {
        if (JSON.parse(localStorage.getItem("upload"))) {
            this.$router.replace(this.$route.query.redirect || '/app');
        }
    },

    updated() {
        if (JSON.parse(localStorage.getItem("upload"))) {
            this.$router.replace(this.$route.query.redirect || '/app');
        }
    }

}
</script>

<style lang="scss">
    .access-app-enter, .access-app-leave-to {
        opacity: 0;
    }

    .access-app-enter-active, .access-app-leave-active {
        transition: opacity 3s;
    }
</style>

