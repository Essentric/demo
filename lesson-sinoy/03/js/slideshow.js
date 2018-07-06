$().ready(function () {
    // 图片索引
    var index = 0;
    // 定时器
    var timer;

    // 设置相关属性
    $(".container")[0].style.width = ($("img").length * 1366) + "px";
    $("#btn-left")[0].style.top = (($(".outer")[0].offsetHeight - $("#btn-left")[0].offsetHeight) / 2) + "px";
    $("#btn-right")[0].style.top = (($(".outer")[0].offsetHeight - $("#btn-right")[0].offsetHeight) / 2) + "px";
    $(".nav-a")[0].style.left = (($(".outer")[0].offsetWidth - $(".nav-a")[0].offsetWidth) / 2) + "px";

    $(".circle")[index].style.background = "#187EC0";

    // 为每个圆点绑定事件
    for (var i = 0; i < $(".circle").length; i ++){
        (function (i) {
            $(".circle")[i].onclick = function () {
                index = i;
                circleColor();
                $(".container")[0].style.left = -(1366 * i) + "px";
            }
        })(i)
    }

    // 设置导航圆点颜色
    function circleColor() {
        if (index >= $("img").length - 1) {
            index = 0;
            $(".container")[0].style.left = 0;
        }
        for (var i = 0; i < $(".circle").length; i ++){
            $(".circle")[i].style.background = "#fff";
        }
        $(".circle")[index].style.background = "#187EC0";
    }

    // 自动轮播方法
    function autoPlay() {
        timer = setInterval(function () {
            index ++;
            // 设置索引
            index = index % $("img").length;

            // 调用移动函数
            move($(".container")[0],"left",-1366*index,200,function () {
                circleColor();
            })
        },1000);
    }

    // 开始轮播
    autoPlay();

    // 鼠标移入清除定时器
    $(".outer")[0].onmouseover = function (){
        clearInterval(timer);
    };

    // 鼠标移出继续播放
    $(".outer")[0].onmouseout = function (){
        autoPlay();
    };

    // 上一张
    $("#btn-left")[0].onclick = function () {
        index --;
        if (index >= 0) {
            move($(".container")[0],"left",-1366*index,200,function () {})
            circleColor();
        }else {
            index = 0;
        }
    };

    // 下一张
    $("#btn-right")[0].onclick = function () {
        index ++;
        if (index < $("img").length - 1) {
            move($(".container")[0],"left",-1366*index,200,function () {});
            circleColor();
        }else{
            index = $("img").length - 2;
        }
    }
});