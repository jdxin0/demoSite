<template>
    <div class="goodsArea">
        <div class="box__hd">
            <h2>{{title}}</h2>
            <span>{{subtitle}}</span>
            <i class="hd-bg"></i>
            <i class="box-line"></i>
        </div>
        <div class="box__bd">
            <ul class="list">
                <template v-if="goodsListArr.length===0">
                    <li class="item load" v-for="n of 5">
                        <i class="load-inner"></i>
                    </li>
                </template>
                <template v-else>
                    <li class="item" v-for="item of goodsListArr" v-if="item.seat==seat" v-bind:key="item.gid" v-bind:data-gid="item.gid">
                        <div class="xl-figure">
                            <div class="figure">
                                <img v-bind:src="item.banner_upload" v-bind:alt="item.name">
                            </div>
                                <div class="figure-info">
                                    <div class="figure-title">{{item.title}}</div>
                                    <i class="info-line"></i>
                                    <div class="figure-subtitle">{{item.descript}}</div>
                                    <a href="javascript:;" class="card-rule" v-if="item.goods_type==2">使用规则&gt;&gt;</a>
                                </div>
                            </div>
                            <div class="item-info">
                                <div class="item-tit">
                                    <span>{{item.name}}</span>
                                    <i class="ico-sellout" v-if="!item.remain"></i>
                                </div>
                                <div class="price">
                                    <span class="price-new">{{item.sj_price}}元</span>
                                    <span class="price-old">{{item.yj_price}}元</span>
                                    <div class="xl-progress__txt">剩余{{item.remain}}个</div>
                                </div>
                                <div class="xl-progress-wp">
                                    <div class="xl-progress">
                                        <i class="xl-progress__inner"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="operations">
                                <a href="javascript:;">购买按钮</a>
                            </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'goodsArea',
    data: function () {
        return {
            msg: 'Welcome to Your Vue.js App!'
        };
    },
    props: ['goodsListArr', 'isVipXuser', 'seat'],
    computed: {
        title: function () {
            if (this.seat == 3) {
                return '1元砍价专区';
            } else if (this.seat == 1) {
                return '超级会员乐购区';
            } else if (this.seat == 2) {
                return '年费超级会员荣耀区';
            }
        },
        subtitle: function () {
            if (this.seat == 3) {
                return '以下任意商品每月限购一次';
            } else if (this.seat == 1) {
                return '该区商品每月限购一款';
            } else if (this.seat == 2) {
                return '该区商品每月限购一款，不与乐购区重复购买';
            }
        }
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .goodsArea{
        border:1px solid;
    }
</style>
