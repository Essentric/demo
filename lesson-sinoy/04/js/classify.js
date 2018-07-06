$().ready(function () {
    //分类数据
    var data = [
        {
            id:1,
            name:"品牌",
            content:["苹果","小米","华为","魅族","三星","索尼","一加","锤子","中兴","360"]
        },
        {
            id:2,
            name:"价格",
            content:["￥10000","￥9000","￥8000","￥7000","￥6000","￥5000","￥4000"]
        },
        {
            id:3,
            name:"产地",
            content:["武汉","广州","深圳","上海","北京","香港","成都","重庆","天津"]
        }
    ];
    // 分类数据初始化
    function classify(data,obj1,obj2,obj3) {
        for (var i in data) {
            if(i == 0){
                obj1.append(
                    '<li>' + data[i].name + '</li>'
                );
                for (var j = 0; j < data[i].content.length; j ++){
                    obj1.append(
                        '<li><a href="javascript:;">' + data[i].content[j] + '</a></li>'
                    );
                }
            }else if(i == 1){
                obj2.append(
                    '<li>' + data[i].name + '</li>'
                );
                for (var j = 0; j < data[i].content.length; j ++){
                    obj2.append(
                        '<li><a href="javascript:;">' + data[i].content[j] + '</a></li>'
                    );
                }
            }else if(i == 2){
                obj3.append(
                    '<li>' + data[i].name + '</li>'
                );
                for (var j = 0; j < data[i].content.length; j ++){
                    obj3.append(
                        '<li><a href="javascript:;">' + data[i].content[j] + '</a></li>'
                    );
                }
            }
        }
    }
    classify(data,$(".trademark"),$(".price"),$(".place"));

    // 事件委托
    function eventDelegation(tag){
        var event = window.event || event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == tag) {
            // console.log(arr);
            return {
                "name":target.parentElement.parentElement.firstElementChild.innerText,
                "content":target.innerHTML
            };
        }
    }

    // 存放已选的数据
    var arr = [];
    $(".price, .place, .trademark").on("click","a",function (event) {
        uniq();
        select($(".selection"));
    })
    //动态显示已选的数据
    function select(obj) {
        // arr = arrNew;
        $("li").remove(".select");
        for (var i in arr){
            obj.append(
                '<li class="select"><span>' + arr[i].content + '</span> <a class="del" href="javascript:;">x</a></li>'
            )
        }
    }
    // 删除已选的数据
    $(".selection").on("click","li",function() {
        var event = window.event || event;
        var target = event.target || event.srcElement;
        for (var i in arr){
            if (arr[i].content == $(target).prev().html()){
                arr.splice(i,1);
                select($(".selection"));
            }
        }

    });

    // 阻止重复选择
    function uniq() {
        var obj = eventDelegation("a");
        if(arr.length == 0) {
            arr.push(obj);
        }else {
            for (var i = 0; i < arr.length; i++){
                if (JSON.stringify(arr[i]).indexOf(JSON.stringify(obj.name)) == -1){
                    if(i == arr.length - 1){
                        arr.push(obj);
                    }
                }else {
                    if(arr[i].content == obj.content){
                        return false;
                    }else {
                        arr[i].content = obj.content;
                        return false;
                    }
                }
            }
        }
    }

    // 提交表单
    $("form").on("click",function (e) {
        var str = "";
        for (var i in arr){
            str += arr[i].name + "=" + arr[i].content + "&";
        }
        str = str.slice(0,str.length - 1);
        $("form").attr("action","#" + str).submit();
    });
    // 获取url参数
    function getArgs() {
        var args = window.location.hash.slice(1);
        args = decodeURI(args);
        return args;
    }

    // 将参数字符串转换成对象
    function fn(str) {
        var arr = [];
        if (str.length !== 0) {
            var arr1 = str.split("&");
            for (var i in arr1){
                var arr2 = arr1[i].split("=");
                var obj = {};
                obj.name = arr2[0];
                obj.content = arr2[1];
                arr.push(obj);
            }
        }
        return arr;
    }
    // 将参数在页面上显示
    (function () {
        var args = getArgs();
        var arrNew = fn(args);
        arr = arrNew;
        select($(".selection"))
    })()

});