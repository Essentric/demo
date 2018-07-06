/*
	该函数可执行简单的动画
	obj:要执行动画的DOM对象
	attr:要执行动画的属性(left,top,width,height)
	target:执行动画的目标位置
	speed:移动的速度(向右为正，向左为负)
	callback:回调函数，动画结束后开始执行
*/
function move (obj,attr,target,speed,callback) {
	// 关闭上一个定时器
	clearInterval(obj.timer);
	// 获取元素目前的位置
	var current = parseInt(getStyle(obj,attr));
	// 判断速度的正负，若0-->800则speed>0
	if (current > target) {
		speed = -speed;
	}
	// 开启一个定时器
	obj.timer = setInterval(function () {
		// 获取原来的值
		var oldValue = parseInt(getStyle(obj,attr));
		// 在原来值得基础上增加
		var newValue = oldValue + speed;
		// 如果速度>0且当前值>目标值，或者速度<0且当前值<目标值
		if ((speed > 0 && newValue > target) || (speed < 0 && newValue < target)) {
			// 将目标值赋给当前值，表示动画结束
			newValue = target;
		}
		// 将obj的值设置为当前
		obj.style[attr] = newValue + 'px';
		// 当元素移动到 0 或移动到目标位置时停止执行动画
		if (newValue == target || newValue == 0) {
			clearInterval(obj.timer);
			// 动画结束后执行回调函数
			callback && callback();//若存在回调则执行，不存在则不执行
		}
	},50)
}

/*
	获取指定元素的当前样式
	obj:指定元素的DOM对象
	name:要获取的样式名(name指需要加引号)
*/
function getStyle (obj,name) {
	if(window.getComputedStyle){
		// 常见浏览器
		return getComputedStyle(obj, null)[name];
	}else {
		// IE8独有
		return obj.currentStyle[name];
	}
}

/*
	判断一个元素中是否含有指定的Class
	若有返回true，否则返回false
	obj:指定元素的DOM对象
	cn:要判断的className(cn指需要加引号)
*/
function hasClass (obj,cn) {
	// \b :匹配一个字边界，即字与空格间的位置
	var reg = new RegExp('\\b' + cn + '\\b');
	return	reg.test(obj.className);
}

/*
	删除一个元素中指定的class属性
	obj:指定元素的DOM对象
	cn:要判断的className(cn指需要加引号)
*/
function removeClass (obj,cn) {
	// \b :匹配一个字边界，即字与空格间的位置
	var reg = new RegExp('\\b' + cn + '\\b');
	// 用空串替换该class
	obj.className = obj.className.replace(reg,'');
}

/*
	为元素添加指定的class
	obj:指定元素的DOM对象
	cn:要判断的className(cn指需要加引号)
*/
function addClass (obj,cn) {
	if(!hasClass(obj,cn)){
		obj.className += ' ' + cn;
	}
}

/*
	toggleClass用来切换一个类
	如果元素中具有该类，则删除
 	如果元素中没有该类，则添加
*/

function toggleClass (obj,cn) {
	// 判断是否有这个类
	if(hasClass(obj,cn)){
		// 有，则删除
		removeClass(obj,cn);
	}else {
		// 没有，则添加
		addClass(obj,cn);
	}
}
