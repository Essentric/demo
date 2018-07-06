$().ready(function () {

    var obj =
    {
        index : 0,
        timer : null,
        // speed : null,
        circleColor : function () {
            if (this.index >= $("img").length - 1) {
                this.index = 0;
                $(".container")[0].style.left = 0;
            }
            for (var i = 0; i < $(".circle").length; i ++){
                $(".circle")[i].style.background = "#fff";
            }
            $(".circle")[this.index].style.background = "#187EC0";
        },
        autoPlay:function(speed){
            this.timer = setInterval(function () {
                (obj.index) ++;
                // 设置索引
                (obj.index) = (obj.index) % $("img").length;
                // 调用移动函数
                move($(".container")[0],"left",-1366*obj.index,obj.speed,function () {
                    obj.circleColor();
                })
            },1000)
            this.speed = speed;
        },
        Next:function (){
            console.log(this.speed)
            $("#btn-right")[0].onclick = function () {
                obj.index ++;
                if (obj.index < $("img").length - 1) {
                    obj.move($(".container")[0],"left",-1366*obj.index,obj.speed,function () {
                        obj.circleColor();
                    });
                }else{
                    obj.index = $("img").length - 2;
                }
            };
        },
        Prev:function () {
            $("#btn-left")[0].onclick = function () {
                obj.index --;
                if (obj.index >= 0) {
                    obj.move($(".container")[0],"left",-1366*obj.index,obj.speed,function () {
                        obj.circleColor();
                    });
                }else {
                    obj.index = 0;
                }
            }
        },
        over:function(){
            $(".outer")[0].onmouseover = function (){
                clearInterval(obj.timer);
            }
        },
        out:function(){
            $(".outer")[0].onmouseout = function (){
                obj.autoPlay();
            }
        },
        addEvent:function(){
            for (var i = 0; i < $(".circle").length; i ++){
                (function (i) {
                    $(".circle")[i].onclick = function () {
                        obj.index = i;
                        obj.circleColor();
                        $(".container")[0].style.left = -(1366 * i) + "px";
                    }
                })(i)
            }
        },
        Init:function(){
            $(".container")[0].style.width = ($("img").length * 1366) + "px";
            // 左右按钮的位置
            $("#btn-left")[0].style.top = (($(".outer")[0].offsetHeight - $("#btn-left")[0].offsetHeight) / 2) + "px";
            $("#btn-right")[0].style.top = (($(".outer")[0].offsetHeight - $("#btn-right")[0].offsetHeight) / 2) + "px";
            // 导航圆点的位置
            $(".nav-a")[0].style.left = (($(".outer")[0].offsetWidth - $(".nav-a")[0].offsetWidth) / 2) + "px";
            $(".circle")[obj.index].style.background = "#187EC0";
        },
        move:function  (obj,attr,target,speed,callback) {
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
    };
    obj.Init();
    obj.Next();
    obj.Prev();
    obj.addEvent();
    obj.over();
    obj.out();
    obj.autoPlay(200);
});

/*
(function ($) {
    var pageSlide = (function () {
        function pageSlide(elements, options) {
            this.settings = $.extend(true, $.fn.pageSlide.defaults, options || {});
            console.log(this.settings);
        }
    })();
    
    pageSlide.prototype = {
      init: function () {
          
      }
    };

    $.fn.pageSlide.defaults = {
        selectors: {

        },
        index: 0,
        speed: 500
    };

    $(function () {
        $([data-pageSlide]).pageSlide();
    })
})(jQuery);*/
