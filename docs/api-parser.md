# Agile VM指令系统。

除了内置的指令（v-text、v-for等），开发者也可以自己扩展指令解析规则，自定义自己的指令。

<h2 id="cid_0">内置指令</h2>

> [v-text](#cid_0_0)

> [v-html](#cid_0_1)

> [v-for](#cid_0_2)

> [v-filter](#cid_0_3)

> [v-context](#cid_0_4)

> [v-on:eventName](#cid_0_5)

> [v-one:eventName](#cid_0_6)

> [v-bind:attributeName](#cid_0_7)

> [v-show](#cid_0_8)

> [v-if/v-elseif/v-else](#cid_0_9)

> [v-model](#cid_0_10)

> [v-like](#cid_0_11)

  


<span id="cid_0_0">**v-text="expression"**</span>

用于渲染文本内容，expression为变量表达式，可以支持字符串拼接，比如：

```html
<div v-text="'agile vm is a'+good+'framework'"></div>
```
假设<code>good变量</code>值为good,则渲染结果为：
```html
<div>agile vm is a good framework</div>
```

特别的，v-text指令还可以通过{{指令}}来简化使用，比如：
```html
<div>agile vm is a {{good}} framework</div>
```

<span id="cid_0_1">**v-html="expression"**</span>

用于富文本内容渲染，expression为变量表达式，不支持字符串拼接。

**注：**

1.在sprite的List组件的cell子组件中不可使用v-html。

2.v-html与v-text指令用法相似，主要区别是v-html不支持字符串拼接，只能赋值一个变量


<span id="cid_0_2">**v-for="item in variable"**</span>

用于循环显示一组数据。其中：

<code>variable</code>必须是一个数组；

<code>item</code>是循环体中数组元素的别名变量，在循环体内使用数组元素都可以通过item来调用。所有的vfor的别名变量不可相同。

v-for指令所在的元素（包含）会不断被复制并顺序绑定变量对应的数组元素。

特别的，循环的索引可以通过<code>$index</code>来获取，当有循环嵌套的时候$index特指当前所在循环体的索引值。如果需要在内层使用外层的索引值可以通过v-filter来实现。

比如：

```html
<div vfor="info in list">
    <span>{{$index}}：{{info.title}}</span>
</div>
```
假设list变量的内容为：
```javascript
var obj = {
    list : [
        {title:'标题1'},
        {title:'标题2'}
    ]
};
```

则渲染的结果为：
```html
<div>
    <span>标题一</span>
</div>
<div>
    <span>标题二</span>
</div>
```

<span id="cid_0_3">**v-filter="funcName"**</span>

配合v-for指令实现数据的过滤器。可以通过该指令为数组元素增加附属值来实现定制循环。

v-filer指令会于v-for指令之前被解释执行。

<code>FuncName</code>为一个函数名，当执行到该指令的时候会调用FuncName(<code>index</code>, <code>item</code>)传参，其中index为当前循环体的索引，item为当前循环体的元素对象。

可以通过给item增加一些附加的key-value数据来实现在v-for循环体内定制化取值。比如：

```html
<box>
    <text v-for="item in list" v-filter="doFilter" v-text="item.name+':'+item.age+':'+$index+':'+item.index"></text>
</box>
``
假设list变量的内容为：
```javascript
var obj = {
    list : [
        {name:'nandy007', age:'18'},
        {name:'ladygaga' , age:'50'}
    ],
    doFilter : function(index, item){
        item.index = index + 1;
    }
};
```

则渲染后的结果为：
```html
<box>
    <text>nandy007:18:0:1</text>
    <text>ladygaga:50:1:2</text>
</box>
```

从js数据结构看，本身每个数组元素只有name和age，而循环体中调用item.index，如果没有v-filter，其值应该为undefined，由于设置了v-filter，并且在设置的处理函数中为item添加了{index:num}的键值对，使得循环体可以正确执行。


<span id="cid_0_4">**v-context="funcName"**</span>

用于为dom元素设置上下文环境，仅用于sprite的component中使用。

由于component中的class和uixml中的class是区分的，当给dom元素设置class的时候需要指定这个class位于uixml中还是component中，此指令就是指定元素的class环境。

比如，在component中的代码片段：
```html
<style>
.titlebox_ios{}
.titlebox_android{}
</style>

<box class="titlebox_android" id="titleboxid" v-context="getContext" v-class="{titlebox_ios:isIos,titlebox_android:isAndroid}">
```
可以看到组件内定义了<code>.titlebox_ios</code>和<code>.titlebox_android</code>，Sprite中设置class的方法为<code>setClassStyle(className:string,domobj:IElement): void</code>,[用法参考](https://gitdocument.exmobi.cn/sprite-api/ggff.html)。

Agile VM默认调用setClassStyle设置样式的时候domobj为空，即设置的样式必须存在与uixml文件，为不是component组件内，如果使用的样式位于component内，则可以通过<code>v-context="funcName"</code>来设置。

<code>funcName</code>为一个处理函数的名字，此函数必须返回一个document对象，如果是在component中，可以返回组件对象，在组件全局中的this对象就特指组件对象。比如：

```javascript
MYshouye.prototype = {
    created: function () {
        var copythis = this;
        this.popmenu = null;
        this.dodata = {
            isIos: true,
            isAndroid: false,
            getContext: function () {
                return copythis;
            }
        }

        $('#root', copythis).render(this.dodata);
    }
```

上面的代码为组件创建中的一部分，其中的getContext返回了copythis变量，变量定义的时候赋值了当前的组件对象本身给它。

回到前面的html代码，v-context的设置对v-class指令产生了影响，样式使用的是组件内的样式（否则使用uixml的样式）。

<span id="cid_0_5">**v-on:eventName="FuncName||funcName([,params])"**</span>

用于为元素绑定事件。

<code>eventName</code>为要监听的事件名，比如：click、touchmove等。

<code>funcName||funcName([,params])</code>为监听回调的两种写法。

<code>funcName</code>形式在监听回调的时候默认传参原生JS事件回调参数，比如：

```html
<script>
    var obj = {
        openList : function(){
            $.util.error(JSON.stringify(arguments)); //把参数打印出来，具体视在Sprite中还是browser中，第一个均为event对象

            var $el = $(this); // this对象即为绑定事件的对象本身
        }
    };
</script>

<div v-on:click="openList">打开List</div>
```

<code>funcName([,params])</code>形式在监听回调的时候传参填写的参数。

```html
<script>
    var obj = {
        title : '标题',
        openList : function(title){
            $.util.error(title); // 打印“标题”文字

            var $el = $(this); // this对象即为绑定事件的对象本身
        }
    };
</script>

<div v-on:click="openList(title)">打开List</div>
```


<span id="cid_0_6">**v-one:eventName**</span>

<code>v-one:eventName</code>与<code>v-on:eventName</code>用法一致。区别为v-one事件会清空eventName的所有事件后再监听，也就是说事件是覆盖的。监听多次只有最后一次生效。

<span id="cid_0_7">**v-bind:attributeName="variable"**</span>

为元素属性值绑定变量。

<code>attributeName</code>为元素属性名。

<code>variable</code>为绑定的变量。

variable的值会赋值给元素的attributeName属性。并且在variable变化的时候attributeName跟着变化，反之不会。


<span id="cid_0_8">**v-show="variable"**</span>

用于组件的显隐。

当variable变量值为true的时候元素显示，为false则隐藏。

<span id="cid_0_9">**v-if/v-elseif/v-else="variable"**</span>

用于控制组件是否渲染。

当variable为true的时候v-if/v-elseif所在组件的内容渲染，否则内容为空；v-else相反。

<span id="cid_0_10">**v-model="variable"**</span>

双向数据绑定指令。<code>v-model</code>指定的<code>variable</code>与元素的<code>value</code>值进行双向绑定。

其规则为：

1.当variable变化时，元素的value值会变化；value的值变化时varibale值也会变化；

2.设置v-model的元素必须具备change事件；

3.目前支持双向数据绑定的元素包括：输入框（textfield）、单选框（radio）、多选框（checkbox）、select选择框（select）。如果开发者自己开发的组件（一般指Sprite组件）实现了以上述四种元素的特性（value值设置和change事件绑定/触发）可以通过<code>v-like="textfield|radio|checkbox|select"</code>告诉mvvm按照哪种逻辑处理；

4.如果开发者开发了自己的双向数据绑定的组件和逻辑，可以通过扩展指令来实现。

<span id="cid_0_11">**v-like="textfield|radio|checkbox|select"**</span>

与v-model配合使用，告诉mvvm采用哪种模式来做双向数据绑定。

<h2 id="cid_1">扩展指令</h2>

目前Agile VM的指令扩展可以通过<code>$.vm.addParser(rules)</code>实现。

其中rules是一个json对象，其key-value形式必须满足：

1.key必须是指令去掉第一个横杠<code>-</code>。比如新增一个叫v-test的指令，则key值为<code>vtest</code>;

2.value必须是一个函数，此函数接收4个参数入参：

> $node        当前指令所在元素的JQLite对象

> fors         当前指令所在的循环体的fors依赖

> expression   当前指令的表达式，即指令=后的值

> dir          当前指令名

而且函数的this指向是Parser实例对象本身，常用的是this.vm（指向Compiler类的实例）、this.$scope（指向data数据），this.setDeepScope()（为vfor循环体设置scope）。

比如：

定义一个新的指令：
```javascript
$.vm.addParser({
    'vtest' : function($node, fors, expression, dir){
        $node.addClass(expression); // 将表达式的内容作为
    }
});
```
视图层即可调用：
```html
<box id="aa" v-test="myclass">
    <text v-on:click="openList">打开List</text>
</box>
```

为了方便开发者理解扩展，这里对内置的v-text指令源码注释如下：

```javascript
'vtext': function ($node, fors, expression, dir, updateFunc) {
            //获取parser对象本身，获取parser绑定的updater
			var parser = this, updater = this.updater;
            //获取data数据源
			var scope = this.$scope;
            //定义依赖数组
			var deps = [];
            //解析表达式，字符串拼接的内容均需各自解析，所以进行分割，如果不是拼接的则exps的length为1
			var exps = expression.split('+');
            //对表达式进行便利处理，过滤常量等依赖
			$.util.each(exps, function (i, exp) {
				exp = exp.trim();
				//常量不作为依赖
				if (!Parser.isConst(exp)) {
					deps.push(Parser.makePath(exp, fors));
					exps[i] = Parser.makeAliasPath(exp, fors);
				}
			});

            //定义处理函数
			var func = new Function('scope', 'try{ return ' + exps.join('+') + '; }catch(e){return "";}');
            //获取当前绑定data里的值
			var text = func(scope);

			updateFunc = updateFunc || 'updateTextContent';
            //更新dom中的text值
			updater[updateFunc]($node, text);
            //检测data数据变化
			this.watcher.watch(deps, function (options) {
                //当变化的时候重新取值
				text = func(scope);
                //并且设置到dom元素中
				updater[updateFunc]($node, text);
			}, fors);
		},
```