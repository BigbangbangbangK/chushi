<template>
  <div class="mine">
    <div class="mine_body">
      <MineTab></MineTab>
      <div class="top">
        <img src="../../assets/image/mine/topBg.jpg" alt class="photo" />
        <transition enter-active-class="animated bounceInDown slow">
          <a class="login" v-if="show" @click="goLogin">
            <span>{{user&&'点击登陆'}}</span>
          </a>
        </transition>
      </div>

      <!-- 收藏 -->
      <div class="collect">
        <ul>
          <li v-for="(item,index) of collect" :key="index">
            <keep-alive :include="$route.meta.include">
              <router-link :to="item.path">
                <p>{{item.num}}</p>
                <p>{{item.shopCollect}}</p>
              </router-link>
            </keep-alive>
          </li>
        </ul>
      </div>

      <!-- 商家中心 -->
      <div class="bussiness">
        <h2>商家中心</h2>
        <ul>
          <li>
            <router-link to="/deliver">
              <img src="../../assets/image/mine/deliver.png" alt />
              <p>订单发货</p>
            </router-link>
          </li>
          <li>
            <router-link to="/deposit">
              <img src="../../assets/image/mine/pay.png" alt />
              <p>货款提现</p>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 我的订单 -->
      <div class="order">
        <h2>
          <span>我的订单</span>
          <router-link :to="{name:'orders'}">
            查看全部订单
            <span class="fas fa-angle-right"></span>
          </router-link>
        </h2>
        <ul>
          <li v-for="(item,index) of wait " :key="index">
            <a>
              <span class="fas" :class="[item.className]"></span>
              <p>{{item.des}}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- 其他 -->
      <div class="ulist">
        <!-- 门店自提订单 -->
        <p class="self">
          <a href>
            门店自提订单
            <span class="fas fa-angle-right"></span>
          </a>
        </p>

        <!-- 我的优惠券 -->
        <p class="coupon">
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />

          <van-popup
            v-model="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px;"
          >
            <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChange"
              @exchange="onExchange"
            />
          </van-popup>
        </p>

        <!-- 收货地址管理 -->
        <p class="addr">
          <router-link to="/addr">
            收货地址管理
            <span class="fas fa-angle-right"></span>
          </router-link>
        </p>

        <!-- 用户设置 -->
        <p class="setting">
          <router-link to="/setting">
            用户设置
            <span class="fas fa-angle-right"></span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MineTab from "./MineTab";
import "animate.css";
import coupon from "./couponStore";
import { getCookie } from "@/utils/cookie.js";
import { getStorage } from "@/utils/storage";
export default {
  components: {
    MineTab
  },
  methods: {
    goLogin() {
      if (this.user.length) {
        this.$router.push("/uCenter");
      } else {
        this.$router.push("/login");
      }
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange() {
      this.coupons.push(coupon);
    },
    userFn() {
      this.user = getStorage("user");
    }
  },
  computed: {
    username() {
      return getCookie("username");
    }
  },
  data() {
    return {
      user: "",
      chosenCoupon: -1,
      coupons: coupon.coupon,
      disabledCoupons: coupon.coupon,
      showList: false,
      collect: [
        {
          num: 0,
          shopCollect: "商品收藏",
          path: "/collect/goods"
        },
        {
          num: 0,
          shopCollect: "店铺收藏",
          path: "/collect/shop"
        },
        {
          num: 0,
          shopCollect: "我的足迹",
          path: "/footprint"
        }
      ],
      wait: [
        {
          className: "fa-industry",
          des: "待付款"
        },
        {
          className: "fa-calendar",
          des: "待发货"
        },
        {
          className: "fa-sticky-note",
          des: "待评价"
        },
        {
          className: "fa-registered",
          des: "待收货"
        },
        {
          className: "fa-city",
          des: "退款/退货"
        }
      ],
      show: false
    };
  },
  mounted() {
    this.userFn();
    setTimeout(() => {
      this.show = !this.show;
    }, 0);

    let collection = localStorage.getItem("collection");
    if (collection) {
      collection = JSON.parse(collection);
      this.collect[0].num = collection.length;
    }
  }
};
</script>
<style lang="stylus" scoped>
.mine {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .mine_body {
    background-color: #f2f2f2;
    width: 100%;
    overflow: auto;

    .top {
      position: relative;

      .photo {
        width: 100%;
        height: 1.81rem;
      }

      .login {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: rgb(0, 0, 0, 0.5);
        position: absolute;
        left: 50%;
        margin-left: -0.5rem;
        top: 50%;
        margin-top: -0.5rem;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        span {
          color: white;
          position: absolute;
          bottom: -0.2rem;
          font-size: 0.16rem;
        }
      }
    }

    .collect {
      display: flex;
      width: 100%;
      height: 0.58rem;
      background-color: white;

      ul {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        li {
          flex: 1;

          a {
            color: #222;

            p {
              text-align: center;
            }
          }
        }
      }
    }

    .bussiness {
      margin-bottom: 0.15rem;

      h2 {
        margin-top: 0.15rem;
        margin-bottom: 1px;
        height: 0.5rem;
        background-color: #fff;
        line-height: 0.51rem;
        text-indent: 0.2rem;
        font-size: 0.16rem;
      }

      ul {
        display: flex;
        background-color: #fff;
        height: 0.7rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        li {
          width: 50%;
          text-align: center;

          a {
            color: #222;

            img {
              width: 0.3rem;
            }
          }
        }
      }
    }

    .order {
      width: 100%;
      margin-bottom: 1px;

      h2 {
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.15rem;
        background-color: #fff;
        align-items: center;
        margin-bottom: 1px;

        a {
          color: #222;
        }
      }

      ul {
        width: 100%;
        display: flex;
        background-color: #fff;
        height: 1.05rem;

        li {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #222;

          a {
            text-align: center;

            span {
              margin-bottom: 0.1rem;
              font-size: 0.16rem;
              align-self: center;
            }
          }
        }
      }
    }

    .ulist {
      width: 100%;
      margin-bottom: 0.3rem;

      p {
        height: 0.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        margin-bottom: 1px;

        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #111;
          width: 100%;
          height: 100%;
          padding: 0 0.15rem;

          span {
            font-size: 0.2rem;
            color: #ccc;
          }
        }

        &.addr {
          margin-top: 0.15rem;
        }
      }
    }
  }
}
</style>