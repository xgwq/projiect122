//文章列表
$(function () {
    var data = {
        pagenum: 1,
        pagesize: 6,
    }
    //str放到list里面的话就是换页，放到外面是往下新增
    var str = `<div class="kr_news_date">
     17 <span>08月</span>
     </div>
     `;
    list();
    //加载列表数据
    function list() {
        $.ajax({
            url: "http://localhost:8888/api/articles",
            type: "get",
            data: data,
            success: function (res) {
                if (res.status == 0) {

                    $.each(res.data, function (index, item) {
                        str += `
                    <div class="item">
                        <h4>
                            <a href="./detail.html?id=${item.id}">${item.title}</a>
                        </h4>
                        <p class="meta">
                            <span>15分钟前 分享至</span>
                            <a href="javascript:;" class="wechat"></a>
                            <a href="javascript:;" class="weibo"></a>
                        </p>
                        <p class="brief">${item.content}</p>
                    </div> 
`;
                    })
                    $(".kr_news_list").html(str);

                }
            }
        })
    }

    //点击按钮加载数据
    $('.kr_more').on("click", function () {
        //  alert(1);
        data.pagenum += 1;
        list();
    })

});