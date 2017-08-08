## vddl-draggable

some info.

#### Base Usage

```html
<vddl-draggable v-for="(item, index) in list" :key="item.id"
  :draggable="item"
  :index="index"
  :wrapper="list"
  effect-allowed="move">
  {{item.label}}
</vddl-draggable>
```

#### Type and disableIf

some info.

#### Callback handle

```html
<vddl-draggble
  ...
  :selected="selectedEvent"
  :dragstart="handleDragstart"
  :dragend="handleDragend"
  :canceled="handleCanceled"
  >
  item
</vddl-draggable>

```

#### Attributes

|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|draggable| draggable data | object, Array | —— | —— |
|index| the draggable item index | number | —— | —— |
|wrapper| wrapper list data | array | —— | —— |
|effectAllowed| effect-allowed | string | move, copy | move |
|type| type | string | —— | —— |
|disableIf| disableIf | boolean | —— | —— |
|selected| selected | function | —— | —— |
|dragstart| dragstart | function | —— | —— |
|dragend| dragend | function | —— | —— |
|canceled| canceled | function | —— | —— |
|moved| moved | function | —— | —— |
|copied| copied | function | —— | —— |
