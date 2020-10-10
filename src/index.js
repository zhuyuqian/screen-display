import {getEl, getParentEl, getOffsetByEl} from "./util/dom";
import cfg from './config';

class Dashboard {
    constructor(options) {
        this.$options = options;
        // 绑定的el
        this.$el = getEl(options.el);
        // 上级el
        this.$parent = getParentEl(this.$el);
        // 设计稿宽度
        this.designWidth = options.designWidth || cfg.designWidth;
        // 设计稿长度
        this.designHeight = options.designHeight || cfg.designHeight;
        // 与设计稿不同时展示的位置
        this.compatPosition = options.compatPosition || cfg.compatPosition;
        // 屏幕发生变化时内部重新计算的延迟
        this.resizeTimer = options.resizeTimer || cfg.resizeTimer;
        // 重新计算的事件
        this.resizeEvent = options.resizeEvent || cfg.resizeEvent;
        // 是否禁用resize
        this.disabledResize = options.disabledResize || cfg.disabledResize;

        this._diffUnit = 0; // 比例差值
        this._pWidth = 0; // 上级宽度
        this._pHeight = 0; // 上级高度
        this._scaling = 0; // 缩放比例
        this._translate = '0,0'; // 偏移量
        this._resizeTimeout = null; // 延迟定时器

        this._resize();
        this._bindResizeByEvent();
    }

    // 重置
    _resize() {
        this._calcParentNodeWH();
        this._calcScaling();
        this._calcTranslate();
        this._bindStyleText();
    }

    // 计算上级元素的宽高
    _calcParentNodeWH() {
        let offset = getOffsetByEl(this.$parent);
        this._pWidth = offset.offsetWidth;
        this._pHeight = offset.offsetHeight;
        this._diffUnit = this._pWidth / this._pHeight - this.designWidth / this.designHeight;
    }

    // 计算缩放比例
    _calcScaling() {
        this._scaling = this._pWidth === this.designWidth && this._pHeight === this.designHeight ?
            1 // 宽度和高度都相等
            : (this._diffUnit > 0 ?
                this._pHeight / this.designHeight :
                this._pWidth / this.designWidth);
    }

    // 计算偏移量
    _calcTranslate() {
        switch (this.compatPosition) {
            case 'top-left':
                this._translate = '0,0';
                break;
            case 'top-center':
                this._translate = `${(this._pWidth - this.designWidth * this._scaling) / 2 / this._scaling}px,0`;
                break
            case 'top-right':
                this._translate = `${(this._pWidth - this.designWidth * this._scaling) / this._scaling}px,0`;
                break;
            case 'bottom-left':
                this._translate = `0,${(this._pHeight - this.designHeight * this._scaling) / this._scaling}px`;
                break;
            case 'center-left':
                this._translate = `0,${(this._pHeight - this.designHeight * this._scaling) / 2 / this._scaling}px`;
                break;
        }
    }

    // 绑定style
    _bindStyleText() {
        Object.assign(this.$el.style, {
            "transform-origin": "0 0",
            transform: `scale(${this._scaling},${this._scaling}) translate(${this._translate})`,
            width: `${this.designWidth}px`,
            height: `${this.designHeight}px`
        })
        this.$options.onResize && this.$options.onResize(this, {
            actualWidth: this.designWidth * this._scaling,
            actualHeight: this.designHeight * this._scaling,
        })
    }

    // 绑定重新计算所需要的事件
    _bindResizeByEvent() {
        this._bind = () => {
            if (this.disabledResize) {
                return;
            }
            if (this._resizeTimeout) {
                clearTimeout(this._resizeTimeout);
                this._resizeTimeout = null;
            }
            this._resizeTimeout = setTimeout(() => {
                this._resize();
                this._resizeTimeout = null;
            }, this.resizeTimer)
        }

        if (this.resizeEvent.includes('window')) {
            window.addEventListener('resize', this._bind);
        }
    }

    // 解绑重新计算所需要的事件
    _unbindResizeByEvent() {
        if (this.resizeEvent.includes('window')) {
            window.removeEventListener('resize', this._bind);
        }
    }

    // 手动resize
    resize() {
        this._resize();
    }

    // 解除绑定
    destroy() {
        this._unbindResizeByEvent();
    }
}

export default Dashboard;