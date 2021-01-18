//获取id值
function getId() {
    var url = location.href;
    var arr = url.split("?");
    // console.log(arr);
    url = arr[1];
    var params = url.split("&")
    // console.log(url);
    var obj = {};
    for (var i = 0; i < params.length; i++) {
        var one = params[i];
        one = one.split("=");
        var key = one[0];
        var val = one[1];
        obj[key] = val;
    }
    return obj.id;

}
var id = getId();
// console.log(id);



pinlun();
//文章评论列表
function pinlun() {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8888/api/articles/' + id + '/comments',
        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                str = '<h4><i class="sprites"></i>评论区</h4>';
                $.each(res.data, function (index, item) {
                    str += `
                            <div class="kr_comment_card">
                            <div class="img-wrap">
                                                        <img src="./uploads/avatar_3.jpg" alt="">
                                                    </div>
                                                    <div class="info">
                                                        <p>${item.uname} · <span>2020-08-16</span></p>
                                                        <p>${item.content}</p>
                                                    </div>
                                                    <a href="javascript:;" class="like">${item.count}</a>
                                                </div>
                                                </div>
                            `
                })
                $("#c-list").html(str);
            }
        }
    })
}
var layer = layui.layer;
pin();

function pin() {
    //写评论
    $("#pin").submit(function (e) {
        //阻止默认行为
        e.preventDefault();
        //收集数据---这里用let收集到的信息就不是字符编码
        let data = $(this).serialize();
        console.log(data);
        //发送请求，提交数据
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/articles/' + id + '/comments',
            data: data,
            success: function (res) {
                if (res.status == 0) {
                    //评论成功
                    layer.msg(res.message);
                    //重新渲染列表
                    pinlun();
                }
            }
        })

    })
}