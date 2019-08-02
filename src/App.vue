<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Kanit&subset=thai,latin' rel='stylesheet' type='text/css'>
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style>
main {
  height: inherit;
  display: flex;
  justify-content: center;
  margin: auto;
  /* Medium devices (landscape tablets, 812px and up) */
  @media only screen and (min-width: 812px) {
    margin: 40px 0;
    height: auto;
  }
}

#app {
  font-family: "Kanit", Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
