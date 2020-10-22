<h1 align="center">screen-display</h1>

[![Latest Version on NPM](https://img.shields.io/npm/v/screen-display.svg?style=flat-square)](https://npmjs.com/package/screen-display)

> 一个轻量级的大屏数据展示方案

## 目录

* [特性](#特性)
* [使用](#使用)
  * [配置](#配置)
  * [API](#API)

### 效果

[点我查看](https://vuedirective.zyq.life/dashboard)

### 特性

* 比较轻量，不依赖其他库 
* 参数配置灵活

## 使用

安装
```bash
$ npm i -s screen-display
```

使用
```vue
<template>
    <div id="app">
      <div id="dashboard">大屏内容</div>
    </div>
</template>

<script>
    import ScreenDisplay from 'screen-display';

    export default {
        mounted() {
          let screen = new ScreenDisplay({
                el: '#dashboard',
              })
          this.$on('hook:beforeDestroy', () => {
            screen.destory();
          })
        }
    }
</script>
```

### 配置

#### el
类型: `Element`或`String`<br>
必须: `是`<br>
默认: `无`<br>
说明：可以传入一个dom节点，也可以传入id选择器

```javascript
let options = {el: document.querySelector('#dashboar')};
let options = {el: '#dashboard'};
```

#### designWidth
类型: `Number`<br>
必须: `false`<br>
默认: `1920`<br>
说明：设计稿宽度

```javascript
let options = {designWidth: 1920};
```

#### designHeight
类型: `Number`<br>
必须: `false`<br>
默认: `1080`<br>
说明：设计稿高度

```javascript
let options = {designHeight: 1080};
```

#### resizeTimer
类型: `Number`<br>
必须: `false`<br>
默认: `300`<br>
说明：默认会监听浏览器resize事件，当发生resize时，延迟多久重新计算大屏，单位毫秒。

```javascript
let options = {resizeTimer: 300};
```

#### resizeEvent
类型: `String`<br>
必须: `false`<br>
默认: `window,parent`<br>
说明：默认当window或者上级元素发生resize时，触发大屏重新计算

```javascript
let options = {resizeEvent: 'window,parent'};
```

#### disabledResize
类型: `Boolean`<br>
必须: `false`<br>
默认: `false`<br>
说明：是否禁用大屏自动重新计算，当值为true时，即便window发生resize了，大屏也不会重新计算

```javascript
let options = {disabledResize: false};
```

#### compatPosition
类型: `String`<br>
必须: `false`<br>
默认: `top-center`<br>
说明：当当前展示设备与设计稿屏幕比例不一致时，大屏的兼容展示位置

```javascript
// 纵向贴顶，横向贴左
let options = {compatPosition: 'top-left'};
// 纵向贴顶，横向居中
let options = {compatPosition: 'top-center'};
// 纵向贴顶，横向贴右
let options = {compatPosition: 'top-right'};
// 纵向贴底，横向贴左
let options = {compatPosition: 'bottom-left'};
// 纵向居中，横向贴左
let options = {compatPosition: 'center-left'};
// 纵向居中，横向居中
let options = {compatPosition: 'center-center'};
```

#### onResize
类型: `Function`<br>
必须: `false`<br>
默认: `无`<br>
说明：每次大屏重新计算完成后触发的回调函数

```javascript
let options = {
    onResize (instance, {actualWidth,actualHeight}){
        // instance：当前实例
        // actualWidth：当前大屏实际长度
        // actualWidth：当前大屏实际宽度
    }
};
```

---

### API

#### screenInstance.resize

`Function`

> 手动调用重新计算的函数

```javascript
let screen = new ScreenDisplay({el: '#dashboard'});
screen.resize()
```

#### screenInstance.destroy

`Function`

> 移除对window.resize和parent.resize的事件监听

```javascript
let screen = new ScreenDisplay({el: '#dashboard'});
screen.destroy()
```

## License

[MIT license](LICENSE)