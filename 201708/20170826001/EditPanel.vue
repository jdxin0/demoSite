<template>
  <div class="panel panel-edit">
    <div class="panel-tab clearfix">
      <div class="tab"
           :class="{ active: panelTabState === 0 }"
           @click="function () { panelTabState = 0 }">
        <span v-show="panelState === 11">文本</span>
        <span v-show="panelState === 12">元素</span>
      </div>
      <div class="tab"
           :class="{ active: panelTabState === 1 }"
           @click="function () { panelTabState = 1 }">动作</div>
      <div class="tab"
           :class="{ active: panelTabState === 2 }"
           @click="function () { panelTabState = 2 }">数据</div>
    </div>

    <!--<Button type="success" style="margin-left: 30px;font-size: 20px;padding-left: -10px;position: relative;left: -100%;top: 20%;"><input  type="color" v-model="element.backgroundColor" style="border: 0;background-color: inherit;position: absolute;top: -5px;left: -3px;display: inline-block;width: 130px;height: 50px;opacity: 0;"/>&nbsp;&nbsp;<span>风格管理</span></Button>-->
    <div v-show="panelTabState === 0">
      <!-- 文字编辑界面特有控件 -->
      <div v-show="panelState === 11">
        <div class="item">
          <label>文本内容</label>
          <div class="content">
            <el-input class="input"
                      v-model="element.text"
                      type="textarea"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <el-checkbox v-model="element.fontWeight"
                         true-label="bold"
                         false-label="normal">加粗</el-checkbox>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <el-button size="small"
                       type="primary"
                       @click="element.textAlign = 'left'">左对齐</el-button>
            <el-button size="small"
                       type="primary"
                       @click="element.textAlign = 'center'">居中</el-button>
            <el-button size="small"
                       type="primary"
                       @click="element.textAlign = 'right'">右对齐</el-button>
          </div>
        </div>
        <div class="item">
          <label>颜色</label>
          <div class="content">
            <el-input class="input"
                      type="color"
                      v-model="element.color"></el-input>
          </div>
        </div>
        <div class="item">
          <label>背景颜色</label>
          <div class="content">
            <el-input class="input"
                      type="color"
                      v-model="element.backgroundColor"></el-input>
          </div>
        </div>
        <div class="item">
          <label>字体大小</label>
          <div class="content">
            <el-input-number v-model="element.fontSize"></el-input-number>
          </div>
        </div>
        <div class="item">
          <label>行高</label>
          <div class="content">
            <el-input-number v-model="element.lineHeight"></el-input-number>
          </div>
        </div>
        <div class="item">
          <label>字体</label>
          <div class="content">
            <el-input v-model="element.fontFamily"></el-input>
          </div>
        </div>
      </div>
      <!-- 通用控件-->
      <div class="item">
        <label>跳转链接</label>
        <div class="content">
          <el-input v-model="element.href"></el-input>
        </div>
      </div>
      <div class="item">
        <label>透明度</label>
        <div class="content">
          <el-slider v-model="element.opacity"></el-slider>
        </div>
      </div>
      <div class="item">
        <label>层级</label>
        <div class="content">
          <el-input-number v-model="element.zindex"></el-input-number>
        </div>
      </div>
      <div class="item">
        <label>旋转</label>
        <div class="content">
          <el-slider v-model="element.transform"
                     :max="359"></el-slider>
        </div>
      </div>
      <div class="item"
           v-show="panelState !== 11">
        <label>高</label>
        <div class="content">
          <el-input v-model="element.height">
            <template slot="append">px</template>
          </el-input>
        </div>
      </div>
      <div class="item">
        <label>宽</label>
        <div class="content">
          <el-input v-model="element.width">
            <template slot="append">px</template>
          </el-input>
        </div>
      </div>
      <div class="item">
        <label>X轴坐标</label>
        <div class="content">
          <el-input v-model="element.left">
            <template slot="append">px</template>
          </el-input>
        </div>
      </div>
      <div class="item">
        <label>Y轴坐标</label>
        <div class="content">
          <el-input v-model="element.top">
            <template slot="append">px</template>
          </el-input>
        </div>
      </div>
    </div>
    <div v-if="panelTabState === 1">
      <div class="item">
        <label>动画库</label>
        <div class="content">
          <el-select placeholder="daneden/animate.css"
                     v-model="element.animatedName"
                     clearable>
            <el-option v-for="item in animateList"
                       :label="item"
                       :value="item">
            
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <label>是否循环</label>
        <div class="content">
          <el-checkbox v-model="element.loop">循环</el-checkbox>
        </div>
      </div>
      <div class="item">
        <label>速度</label>
        <div class="content">
          <el-slider v-model="element.duration"
                     :step="0.1"
                     :min="0"
                     :max="10"></el-slider>
        </div>
      </div>
      <div class="item">
        <label>延迟</label>
        <div class="content">
          <el-slider v-model="element.delay"
                     :step="0.1"
                     :min="0"
                     :max="10"></el-slider>
        </div>
      </div>
    </div>
    <div v-if="panelTabState === 2">
      <div class="content">
        <!--<div v-html="element.html"></div>-->
        选项卡一名称<input type="text" v-model="tab1_name">
        选项卡二名称<input type="text" v-model="tab2_name">
        选项卡三名称<input type="text" v-model="tab3_name">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .panel-edit {
    z-index: 1;

  .item {
    padding: 5px 0;
    clear: both;
  .content {
    margin-left: 70px;


  }
  }
  label {
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    width: 70px;
    float: left;
    padding: 11px 12px 11px 0;

  }
  }

  .panel-tab {

    line-height: 40px;
    margin: -10px -10px 10px;
  .tab {

    float: left;
    width: 33.3333333333%;
    text-align: center;
    cursor: pointer;
    background-color: #d6d6d6;

  &.active {

     background-color: transparent;

   }
  }
  }
  @keyframes fadeInNormal {
      0% {opacity:0;}
      100% {opacity: 1;}
  }
  .rotateInDownLeft {
      animation: rotateInDownLeft 1.1s ease 1.6s both running;
  }
  @keyframes rotateInDownLeft{
      0% {transform-origin: left bottom;transform: rotate(-90deg) translateZ(0);opacity: 0;}
      100% {transform-origin: left bottom;transform: rotate(0) translateZ(0);opacity: 1;}
  }
  @keyframes rotateInDownRight{
      0% {transform-origin: right bottom;transform: rotate(90deg) translateZ(0);opacity: 0;}
      100% {transform-origin: right bottom;transform: rotate(0) translateZ(0);opacity: 1;}
  }
  @keyframes zoomIn {
      0% {opacity: 0;transform: scale3d(.3, .3, .3) translateZ(0);}
      50% {opacity: 1;}
  }
  @keyframes zoomInDown {
      0% {opacity: 0;transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);}
      60% {opacity: 1;transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);}
  }
  @keyframes fadeIn {
      0% {transform: scale(0) translateZ(0);opacity: 0;}
      60% {transform: scale(1.1) translateZ(0);opacity: 1;  }
      80% {transform: scale(0.9) translateZ(0);opacity: 1;  }
      100% {transform: scale(1) translateZ(0);opacity: 1;  }
  }
  @keyframes expandOpen {
      0% {opacity: 0;transform: scale(1.8) translateZ(0);}
      50% {opacity: 1;transform: scale(0.95) translateZ(0);}
      80% {transform: scale(1.05) translateZ(0);}
      90% {transform: scale(0.98) translateZ(0);}
      100% {transform: scale(1) translateZ(0);}
  }
  @keyframes fadeInLeft {
      0% {opacity: 0;transform: translate3d(-100%, 0, 0);}
      100% {opacity: 1;transform: translate3d(0,0,0);}
  }
  @keyframes fadeInRight {
      0% {opacity: 0;transform: translate3d(100%, 0, 0);}
      100% {opacity: 1;transform: translate3d(0,0,0);}
  }
  @keyframes fadeInUp {
      0% {    opacity: 0;transform: translate3d(0, 100%, 0);}
      100% {    opacity: 1;transform: translate3d(0, 0, 0);}
  }
  @keyframes fadeInDown {
      0% {opacity: 0;transform: translate3d(0, -100%, 0);  }
      100% {opacity: 1;transform: translate3d(0,0,0);  }
  }
  @keyframes rotateIn {
      0% {transform-origin: center center;transform: rotate(-200deg) translateZ(0);opacity: 0;  }
      100% {transform-origin: center center;transform: rotate(0deg) translateZ(0);opacity: 1;  }
  }
  @keyframes flipInY {
      0% {transform: perspective(400px) rotateY(90deg) translateZ(0);opacity: 0;}
      40% {transform: perspective(400px) rotateY(-10deg) translateZ(0);}
      70% {transform: perspective(400px) rotateY(10deg) translateZ(0);}
      100% {transform: perspective(400px) rotateY(0deg) translateZ(0);opacity: 1;}
  }
  @keyframes flipInX {
      0% {transform: perspective(400px) rotateX(90deg);opacity: 0;}
      40% {transform: perspective(400px) rotateX(-10deg);}
      70% {transform: perspective(400px) rotateX(10deg);}
      100% {transform: perspective(400px) rotateX(0deg);opacity: 1;}
  }
  @keyframes lightSpeedIn {
      0% { transform: translateX(100%) skewX(-30deg); opacity: 0; }
      60% { transform: translateX(-20%) skewX(30deg); opacity: 1; }
      80% { transform: translateX(0%) skewX(-15deg); opacity: 1; }
      100% { transform: translateX(0%) skewX(0deg); opacity: 1; }
  }
  @keyframes slideRight {
      0% {opacity: 0;transform: translateX(-150%);  }
      50%{opacity: 1;transform: translateX(8%);  }
      65%{transform: translateX(-4%);  }
      80%{transform: translateX(4%);  }
      95%{transform: translateX(-2%);  }
      100% {transform: translateX(0%);  }
  }
  @keyframes slideLeft {
      0% {opacity: 0;transform: translateX(150%);  }
      50%{opacity: 1;transform: translateX(-8%);  }
      65%{transform: translateX(4%);  }
      80%{transform: translateX(-4%);  }
      95%{transform: translateX(2%);  }
      100% {transform: translateX(0%);  }
  }
  @keyframes slideUp {
      0% {opacity: 0;transform: translateY(100%);  }
      50%{opacity: 1;transform: translateY(-8%);  }
      65%{transform: translateY(4%);  }
      80%{transform: translateY(-4%);  }
      95%{transform: translateY(2%);  }
      100% {transform: translateY(0%);  }
  }
  @keyframes slideDown {
      0% {opacity: 0;transform: translateY(-100%) translateZ(0);  }
      50%{opacity: 1;transform: translateY(8%);  }
      65%{transform: translateY(-4%);  }
      80%{transform: translateY(4%);  }
      95%{transform: translateY(-2%);  }
      100% {transform: translateY(0%);  }
  }
  @keyframes stretchRight {
      0% {opacity: 0;transform: scaleX(0.3);transform-origin: 0% 0%;}
      40% {opacity: 1;transform: scaleX(1.02);transform-origin: 0% 0%;  }
      60% {transform: scaleX(0.98);transform-origin: 0% 0%;  }
      80% {transform: scaleX(1.01);transform-origin: 0% 0%;  }
      100% {transform: scaleX(0.98);transform-origin: 0% 0%;  }
  }
  @keyframes stretchLeft {
      0% {opacity: 0;transform: scaleX(0.3);transform-origin: 100% 0%;  }
      40% {opacity: 1;transform: scaleX(1.02);transform-origin: 100% 0%;  }
      60% {transform: scaleX(0.98);transform-origin: 100% 0%;  }
      80% {transform: scaleX(1.01);transform-origin: 100% 0%;  }
      100% {transform: scaleX(0.98);transform-origin: 100% 0%;  }
  }
  @keyframes pullUp {
      0% {opacity: 0;transform: scaleY(0.1) translateZ(0);transform-origin: 50% 100%;  }
      40% {opacity: 1;transform: scaleY(1.02);transform-origin: 50% 100%;  }
      60% {transform: scaleY(0.98);transform-origin: 50% 100%;  }
      80% {transform: scaleY(1.01);transform-origin: 50% 100%;  }
      100% {transform: scaleY(0.98);transform-origin: 50% 100%;  }
  }
  @keyframes pullDown {
      0% {opacity: 0;transform: scaleY(0.1) translateZ(0);transform-origin: 50% 0%;  }
      40% {opacity: 1;transform: scaleY(1.02) translateZ(0);transform-origin: 50% 0%;  }
      60% {transform: scaleY(0.98) translateZ(0);transform-origin: 50% 0%;  }
      80% {transform: scaleY(1.01) translateZ(0);transform-origin: 50% 0%;  }
      100% {transform: scaleY(0.98) translateZ(0);transform-origin: 50% 0%;  }
  }

</style>

<script>
  export default {
    props: {
      element: {
        type: Object
      },
      tab1_name: '',
      tab2_name: '',
      tab3_name: '',
      panelState: {
        type: Number
      }
    },
    data () {
      return {
        panelTabState: 0,
        animateList: ['fadeInNormal','rotateInDownLeft','rotateInDownRight','zoomIn','zoomInDown','fadeIn','expandOpen','fadeInLeft','fadeInRight','fadeInUp','fadeInDown','rotateIn','flipInY','flipInX','lightSpeedIn','slideRight','slideLeft','slideUp','slideDown','stretchRight','stretchLeft','pullUp','pullDown']
      }
    }
  }
</script>
