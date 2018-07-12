$().ready(function() {
  // 为导航菜单设置点击时的样式
  $('.menu-ul>li>a').on('click', function() {
    $(this).addClass('menu-active').parent().siblings('li').children().removeClass('menu-active');
  })

  // 轮播图
  var index = 0;
  $('.carousel-index>li').on('click',function () {
    // 点击导航点图片轮播
    index = $(this).index();
    $('.header-carousel>li').eq(index).fadeIn().siblings('li').fadeOut()
    // 为导航点设置样式
    $(this).addClass('carousel-index-active').siblings('li').removeClass('carousel-index-active');
  })
  
  // 下一页
  $('.next').on('click', function () {
    index ++;
    index = index % 4;
    $('.header-carousel>li').eq(index).fadeIn().siblings('li').fadeOut();
    $('.carousel-index>li').eq(index).addClass('carousel-index-active').siblings('li').removeClass('carousel-index-active');
  })

  // 上一页
  $('.prev').on('click', function () {
    index --;
    index = index % 4;
    $('.header-carousel>li').eq(index).fadeIn().siblings('li').fadeOut();
    $('.carousel-index>li').eq(index).addClass('carousel-index-active').siblings('li').removeClass('carousel-index-active');
  })

  // 自动轮播
  var timer = null;
  function autoPlay() {
    timer = setInterval(function() {
      index ++;
      index = index % 4;
      $('.header-carousel>li').eq(index).fadeIn().siblings('li').fadeOut();
      $('.carousel-index>li').eq(index).addClass('carousel-index-active').siblings('li').removeClass('carousel-index-active');
    }, 2000)
  }

  // 鼠标移入暂停轮播
  $('.header-carousel').on('mouseover', function() {
    clearInterval(timer);
  })

  // 鼠标移出继续轮播
  $('.header-carousel').on('mouseleave', function() {
    autoPlay();
  })
})