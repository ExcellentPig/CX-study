/*
一个再复杂的组件都是由三个部分组成的：prop,event,slot,他们构成了Vue.js组件的API
*/

/*
属性prop
	prop定义了这个组件有哪些可配置的属性，组件的核心功能也都是它来确定的
	写通用组件时，props最好用对象的写法，这样可以针对每个属性设置类型、默认值或者定义校验属性的值
*/
// 封装一个按钮组件i-button
<template>
	<button :class="'i-button-size' + size" :disabled="disabled"></button>
</template>
<script>
	// 判断参数是否是其中之一
	function oneOf (value, validList) {
		for (let i=0;i<validList.length;i++) {
			if (value === validList[i]) {
				return true
			}
		}
		return false
	}
	export default {
		props: {
			size: {
				validator (value) {
					return oneOf(value, ['small', 'large', 'default'])
				},
				default: 'default'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			inheritAttrs: false, // 不开启html特性继承
		}
	}
</script>

// 使用组件
<i-button size="large"></i-button>
<i-button disabled></i-button>

/*
slot
	分发组件的内容
*/
<template>
	<button :class="'i-button-size' + size" :disabled="disabled">
		<slot></slot>
		<slot>slot里面也可以写一些默认内容</slot>
	</button>
</template>
// 使用
<i-button>按钮1</i-button>
<i-button>
	<string>按钮2</string>
</i-button>

/*
自定义事件 event
*/
// 添加自定义事件
<template>
	<button @click="handleClick">
		<slot></slot>
	</button>
</template>
<script>
	export default {
		methods: {
			handleClick (event) {
				this.$emit('on-click', event)
			}
		}
	}
</script>
// 通过$emit触发自定义事件
// 通过 $emit，就可以触发自定义的事件 on-click ，在父级通过 @on-click 来监听
<i-button @on-click="handleClick"></i-button>
// 如果不写.native修饰符，那上面的@click就是自定义事件click,而非原生事件click,但是我们在组件内只
// 触发了on-click事件，而不是click,所以直接写@click会监听不到
<i-button @click.native="handleClick"></i-button>
