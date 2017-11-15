/**
 * Created by chiusin on 2017/11/10.
 */
/**
 *  获取url上的query参数值
 * @param data
 * @param url
 * @returns {*}
 */
 function getQueryString (data, url) {
    var regex = new RegExp('(^|&)' + data + '=([^&]*)(&|$)', 'i'), query = url.toString().split('?')[1];
    if (query) {
        var match = query.match(regex);
        return match && decodeURIComponent(match[2]);
    }
    return null;
}


/**
 * 获取页面卷曲的高度和宽度
 * @returns {{top: (Number|number), left: (Number|number)}}
 */
function scroll() {
    return {
        //内部代码用于兼容各个浏览器
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 吸顶
 * @param affixId(string) 吸顶Id
 * @param bottomId(string) 吸顶紧接的下部结构Id
 * 需要配合属性css选择器 进行样式更改
 */
function affix(affixId, bottomId) {
    var obj = document.getElementById(affixId);
    var BottomObj = document.getElementById(bottomId);
        var ot = obj.offsetTop;
    console.log(ot);
    $(document).on("scroll", function () {
        var st = scroll().top;
        obj.setAttribute("data-fixed", st >= ot ? "fixed" : "");
        BottomObj.setAttribute("data-fixed", st >= ot ? "fixed" : "");
    })
}

/**
 * 电梯导航
 * @param tabId(string)   tab按钮父盒子Id
 * @param contentId(string) 内容父盒子Id
 * @param heightGap(number) 可选参数  定位后离顶部的距离
 */
function elevatorTab(tabId, contentId, heightGap) {
    var marginHeight = +heightGap || 0;
    var tab = document.getElementById(tabId);
    var content = document.getElementById(contentId);

    var lisOl = tab.children;
    var lisUl = content.children;
    var target = 0, leader = 0, timer = null;
    //先遍历
    for (var i = 0; i < lisOl.length; i++) {
        //添加索引自定义属性
        lisOl[i].index = i;
        $(window).on("scroll", function () {
            var scrl = scroll();
            leader = scrl.top;
        })
        //添加点击事件
        $(lisOl[i]).on("click", function (event) {
            event.preventDefault();

            clearInterval(timer);
            //在点击某一个按钮的时候，先根据当前按钮的索引去获取对应的ul中的一样的offsetTop
            //这个offsetTop就是目标值
            target = lisUl[this.index].offsetTop - marginHeight;
            timer = setInterval(function () {
                var step = (target - leader) / 10;
                //进行取整操作
                console.log(marginHeight);
                step = target > leader ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                //这个值设置给window.scrollTo
                window.scrollTo(0, leader);
                //滚到位置
                if (leader == target) {
                    clearInterval(timer);
                }
            }, 17);
        });
    }
    ;

}

/**
 *
 * @param timeSec 事件毫秒数
 * @returns {{hour: number, min: number, sec: number}}
 */
function countTime(timeSec) {
    var hour = Math.floor(timeSec / 1000 / 60 / 60);
    hour = "0" + hour;
    var min = Math.floor(timeSec / 1000 / 60 % 60);
    min = min >= 10 ? min : "0" + min;
    var sec = Math.floor(timeSec / 1000 % 60);
    sec = sec >= 10 ? sec : "0" + sec;
    return {
        hour: hour,
        min: min,
        sec: sec
    }


}

/**
 *
 * @param hourId 时间模块小时的ID
 * @param minId  时间模块分钟的ID
 * @param secId  时间模块秒数的ID
 * @param time   countTime方法的参数
 */
function countTimeChange(hourId, minId, secId, time) {
    var timerCount;
    timerCount = setInterval(function () {
        if (time >= 1000) {
            time = time - 1000;
            $("#" + hourId).text(countTime(time).hour);
            $("#" + minId).text(countTime(time).min);
            $("#" + secId).text(countTime(time).sec);
        } else {
            clearInterval(timerCount);
        }
    }, 1000)

}
function regForm() {
    if(!$("#form_name").val().trim()){
        layer.msg('Please enter your full Name', {
            offset: 't',
            anim: 6,
            skin:"layerTips"
        });
        return false;
    }
    if(!$("#form_mobile").val().trim()){
        layer.msg('Please enter your number', {
            offset: 't',
            anim: 6
        });
        return false;
    }
    if(!$("#form_address").val().trim()){
        layer.msg('Please enter your address', {
            offset: 't',
            anim: 6
        });
        return false;
    }
    if(!$("#form_post_code").val().trim()){
        layer.msg('Please enter your postcode', {
            offset: 't',
            anim: 6
        });
        return false;
    }
    return true;


}

