// 判断是否是节点
export const isEl = (el) => {
    return (typeof HTMLElement === 'object')
        ? (el instanceof HTMLElement)
        : !!(el && typeof el === 'object' && (el.nodeType === 1 || el.nodeType === 9) && typeof el.nodeName === 'string');
}

// 获取节点
export const getEl = (el) => {
    if (isEl(el)) return el;
    return document.querySelector(el);
}

// 获取上级节点
export const getParentEl = (el) => {
    return el.parentNode;
}

// 获取节点的可视宽度和高度
export const getOffsetByEl = (el) => {
    return {
        offsetWidth: el.offsetWidth,
        offsetHeight: el.offsetHeight
    }
}