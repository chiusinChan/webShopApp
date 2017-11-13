$(function () {
    document.addEventListener("selectstart", function () {
        return false;
    })

    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical',
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,

        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationType: "bullets",
        paginationClickable: true,


    });
    //轮询 检查swiper加载完毕没有
    setTimeout(function checkSwiper () {
        if($(".swiper-wrapper").height()>=200){
            affix("tabBar", "content");
                return;
        }else{
            setTimeout(checkSwiper,100)
        }

    },100)

    $("#page2").hide();
    $("#page3").hide();
    $("#page4").hide();


    elevatorTab("tabBar", "content", 50);
    countTimeChange("hour", "min", "sec", 21600000);
    console.log($("#three .list_lh"));
    //评论滚动init
    $(".list_lh").myScroll({
        speed:40, //数值越大，速度越慢
        rowHeight:56 //li的高度
    });
    $(".list_lh li:even").css("background","#F0F2F3");
    //评论滚动init


    $("#page1 .bottomBuy").on("click",function () {
        $("#page1").hide();
        $("#page2").show();
        $("#page3").hide();
        $("#page4").hide();
    })
    $("#page2 .title span").on("click",function () {
        $("#page1").show();
        $("#page2").hide();
        $("#page4").hide();
        $("#page3").hide();
    })
    $("#page3 .title span").on("click",function () {
        $("#page1").hide();
        $("#page2").show();
        $("#page4").hide();
        $("#page3").hide();
    })
    $("#page4 .title span").on("click",function () {
       history.go(-1);
    })



    //算订单总额

    $("#goodsCount .dec").on("click",function () {
        var oldNum=$("#goodsNum").val();
        var newNum=oldNum<=1?1:--oldNum;
        $("#goodsNum").val(newNum);
        $("#totalPrice").text(newNum*99);

    });
    $("#goodsCount .plus").on("click",function () {
        var oldNum=$("#goodsNum").val();
        var newNum=oldNum>99?99:++oldNum;
        $("#goodsNum").val(newNum);
        $("#totalPrice").text(newNum*99);

    })
    $("#goodsNum").on("input",function () {
        console.log(isNaN(+$("#goodsNum").val()));
        if(isNaN(+$("#goodsNum").val())||!$("#goodsNum").val()){
            $("#goodsNum").val(1);

        }else{
            $("#totalPrice").text($("#goodsNum").val()*99);

        }

    })
    //选颜色
    $("#colorUl>li").on("click",function () {
        $(this).siblings().removeClass("selectedColor").end().addClass("selectedColor");
        $("#page2 .priceAndColor.color").text($(this).html());
        $(".picTitle img").attr("src",$(this).attr("data-src"))
    })
    //下一步NEXT
    $("#page2 .next").on("click",function () {
        $("#page1").hide();
        $("#page2").hide();
        $("#page3 #price3").text($("#page2 #totalPrice").html());
        $("#page3").show();
        $("#page4").hide();
    })
    //下一步confirm
    $("#page3 .confirm").on("click",function () {
        $("#page4 #price4").text($("#page3 #price3").html());
        $("#page1").hide();
        $("#page2").hide();
        $("#page3").hide();
        $("#page4").show();
    })





})