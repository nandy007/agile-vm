
# 特殊用法

Agile VM框架有一些用法是API内定义的，这里列出可调用的一些特殊方法。

<h2 id="cid_0">属性计算</h2>

AVM允许开发者通过标准JS的<code>get</code>和<code>set</code>方法来实现属性计算。

比如：

```javascript
var obj = {
    get title(){
        return this._title||'这是默认标题';
    },
    set title(newValue){
        if(newValue.length>12){
            newValue = newValue.substr(0,12);
        }
        this._title = newValue;
    }
};
$('#view').render(obj);//渲染后默认第一次title部分显示'这是默认标题'

obj.title = 'agile-vm框架是一个jquery语法的mvvm框架';//经过计算赋值title的长度只保留12个字符

```

```html
<div id="view">
    <h1 v-text="title"></h1>
</div>
```

<h2 id="cid_1">获取VM对象</h2>

render方法返回的就是VM对象，所以要获取VM对象可以如下使用：

```javascript

var vm = $('#view').render({
    title : ''
});

```

这时候可以通过<code>getData</code>方法获取到注入的数据，比如：

```javascript

var obj = vm.getData();

obj.title = '这是新标题';

```

这样可以在未定义注入数据的情况下再次获取此数据进行操作