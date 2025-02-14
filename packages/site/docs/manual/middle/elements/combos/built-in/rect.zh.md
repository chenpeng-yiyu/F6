---
title: Rect
order: 2
---

F6 内置了矩形 Rect Combo，其默认样式如下。标签文本位于矩形内部左上方。<a href='/zh/examples/item/defaultCombos#rect' target='_blank'>Demo</a> <br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Khp4QpxXVlQAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

## 使用方法

如 [内置 Combo](/zh/docs/manual/middle/elements/combos/defaultCombo) 一节所示，配置 Combo 的方式有三种：实例化图时全局配置，在数据中动态配置，使用 `graph.combo(comboFn)` 函数配置。这几种配置方法可以同时使用，优先级：

使用 `graph.combo(comboFn)` 配置 > 数据中动态配置 > 实例化图时全局配置

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 除 `id`、`parentId`、`label` 应当配置到每个 Combo 数据中外，其余的 [Combo 的通用属性](#/zh/docs/manual/middle/elements/combos/defaultCombo#combo-的通用属性) 以及各个 Combo 类型的特有属性（见内置 Combo 类型）均支持三种配置方式。

<span style="background-color: rgb(251, 233, 231); color: rgb(139, 53, 56)"><strong>⚠️ 注意:</strong></span> 使用 Combo 时，必须在示例化图时配置 `groupByTypes` 设置为 `false`，图中元素的视觉层级才能合理。

### 1 实例化图时全局配置

用户在实例化 Graph 时候可以通过 `defaultCombo` 指定 `type` 为 `'rect'`，即可使用 `rect` Combo。

```javascript
const graph = new F6.Graph({
  ...
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  defaultCombo: {
    type: 'rect', // Combo 类型
    // ... 其他配置
  },
});
```

### 2 在数据中动态配置

如果需要使不同 Combo 有不同的配置，可以将配置写入到 Combo 数据中。这种配置方式可以通过下面代码的形式直接写入数据，也可以通过遍历数据的方式写入。

```javascript
const data = {
  nodes: [
    ... // 节点
  ],
  edges: [
    ... // 边
  ],
  combos: [
  {
	  id: 'combo1',
    type: 'rect', // Combo 类型
    ... // 其他配置
  },
    ... // 其他 Combo
  ],
}
```

## 配置项说明

Rect Combo 支持 [Combo 通用配置](/zh/docs/manual/middle/elements/combos/defaultCombo#combo-的通用属性)，下表对部分属性进行解释。对于 Object 类型的配置项将在后面有详细讲解：<br />

| 名称 | 含义 | 类型 | 备注 |
| --- | --- | --- | --- |
| size | 矩形的最小长与宽（非固定大小） | number / number[] | `size` 为 Number 时，长宽相等 |
| fixSize | 固定该 Combo 的长与宽 | number | 不指定时 Combo 大小由内部元素的分布和大小来决定。若指定了 `fixSize` 而没有指定 `fixCollapseSize`，则即使该 Combo 在收起状态下仍然保持 `fixSize` 指定的长与宽 |
| fixCollapseSize | 固定该 Combo 收起时的直径 | number | 不指定时，若未指定 `fixSize` 则由 `size` 决定收起时的长与宽，否则统一为 `fixSize` 长与宽 ｜ |
| style | rect 图形的默认样式 | Object | 参见下文 [样式属性  style](./rect#样式属性-style) 内容 |
| label | 标签文本内容 | String |  |
| labelCfg | 标签文本配置项 | Object | 参见下文 [标签文本配置 labelCfg](./rect#标签文本配置-labelcfg) |
| stateStyles | 各状态下的样式 | Object | 详见[配置状态样式](/zh/docs/manual/middle/states/state#配置-state-样式) |

### 样式属性  style

Object 类型。支持 [Combo 通用样式](/zh/docs/manual/middle/elements/combos/defaultCombo#样式属性-style)。通过 `style` 配置来修改 Combo 的填充色、描边等属性。下面代码演示在实例化图时全局配置方法中配置 `style`，使之达到如下图效果。<br /> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VwLDQrjV9PkAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  combos: [
    {
      label: 'combo_rect',
      type: 'rect',
      label: 'Rect',
    },
  ],
};
const graph = new F6.Graph({
  ...
  width: 800,
  height: 600,
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  defaultCombo: {
    // type: 'rect',  // 在数据中已经指定 type，这里无需再次指定
    style: {
      fill: '#bae637',
      stroke: '#eaff8f',
      lineWidth: 5,
    },
  },
});
graph.data(data);
graph.render();
```

### 标签文本配置  labelCfg

Object 类型。通过 `labelCfg` 配置标签文本。支持 [Combo 通用标签配置](/zh/docs/manual/middle/elements/combos/defaultCombo/#标签文本-label-及其配置-labelcfg)。基于上面 [样式属性 style](#样式属性-style) 中的代码，下面代码在 `defaultCombo` 中增加了  `labelCfg`  配置项进行文本的配置，使之达到如下图效果。<br /><img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*qAqbSLqTWSoAAAAAAAAAAABkARQnAQ' width=150 alt='img'/>

```javascript
const data = {
  // ... data 内容
};
const graph = new F6.Graph({
  // ... 图的其他属性
  // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
  groupByTypes: false,
  defaultCombo: {
    // ... Combo 其他属性
    labelCfg: {
      position: 'bottom',
      refX: -12,
      style: {
        fill: '#bae637',
        fontSize: 15,
        // ... 其他文本样式的配置
      },
    },
  },
});
// ...
```
