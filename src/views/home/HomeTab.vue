<template>
  <div class="home_tab">
    <div class="logo">
      <img src="./../../assets/logo.png" alt />
    </div>
    <div class="home_search">
      <i class="fas fa-search"></i>
      <router-link :to="
             {name:'search'} ">
        <input type="text" name id placeholder="优选最初的味道" />
      </router-link>
    </div>
    <i class="fas fa-bell message"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homebg: {
        background: "#fff"
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.home_tab {
  display: flex;
  height: 0.35rem;
  padding: 0.09rem 0;
  width: 100%;
  align-items: center;
  background: url('./../../assets/img/home_top_bg1.jpg');

  .logo {
    flex: 44;

    img {
      width: 0.39rem;
    }
  }

  .home_search {
    flex: 300;
    display: flex;
    height: 100%;
    align-items: center;
    background: #f2f2f2;
    border-radius: 0.05rem;

    input {
      flex: 255;
      border: 0;
      height: 0.32rem;
      background: #f2f2f2;
    }

    i {
      font-size: 0.16rem;
      color: #5c5c5c;
      padding: 0 0.1rem;
    }
  }

  .message {
    flex: 36;
    color: #5c5c5c;
    text-align: center;
  }
}
</style>