/*global Vue $*/
import goodsArea from '../components/area.vue';
window.app = new Vue({
    el: '#app',
    data: {
        isVipXuser: false,
        goodsList: null,
        goodsListArr: []
    },
    components: { 'goodsArea': goodsArea },
    computed: {
        areaNum: function() {
            var arr = [0, 0, 0];
            for (var item of this.goodsListArr) {
                if (item.seat == 1) {
                    arr[1]++;
                } else if (item.seat == 2) {
                    arr[2]++;
                } else if (item.seat == 3) {
                    arr[0]++;
                }
            }
            return arr;

        }
    },
    methods: {
        bubbleSort: function(arr) {
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len - 1 - i; j++) {
                    if (arr[j].order - 0 > arr[j + 1].order - 0) {
                        var temp = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        },
        getGoddsData: function() {
            $.ajax({
                url: 'http://www.yanhu.com/201810/xntq-demo/src/data/goodslist.json',
                data: {},
                context: this,
                dataType: 'json',
                success: function(rs) {
                    if (rs.result == 0) {
                        this.goodsList = rs.data.glist;
                        for (var key in this.goodsList) {
                            this.goodsListArr.push(this.goodsList[key]);
                        }
                        this.bubbleSort(this.goodsListArr);
                    }
                },
                error: function() {
                    throw new Error('获取商品数据失败');
                }
            });
        }
    },
    mounted: function() {
        this.getGoddsData();
    }
});
