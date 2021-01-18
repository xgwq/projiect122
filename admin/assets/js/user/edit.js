//<!---------------------------------用户密码“编辑”功能-----------------------------!>
$(function() {
    //<!----引入模块-----!>
    const form = layui.form;
    //<!---------获取用户id，用于动态路由---------!>
    const id = new URLSearchParams(location.search).get('id');
    //<---------通过动态路由查找到对应的用户，获取其数据--------->
    function loadUserInfo() {
        $.ajax({
            type: 'get',
            url: 'admin/users/' + id,
            success: (res) => {
                if (res.status === 0) {
                    form.val('editForm', res.data)
                } else {
                    layer.msg(res.message)
                }
            }
        })
    };
    loadUserInfo();

    // 绑定添加用户表单提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        const params = $(this).serialize();
        $.ajax({
            type: 'put',
            url: 'admin/users',
            data: params,
            success: function(res) {
                layer.msg(res.message);
            }
        })
    })



})