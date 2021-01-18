//<!-----------------------------------------添加用户------------------------------------------!>
$(function() {
    //<!-------引入layui模块-------!>
    const layer = layui.layer,
        form = layui.form;
    //<!----------------‘确认密码’的验证-------------!>
    form.verify({
        same: function(value) {
            const uname = $('.layui-form input[name=password]').val()
            if (value !== uname) {
                return '两次输入的密码不一样'
            }
        }
    });
    //<!----------------ajax提交数据---------------!>
    $('form').on('submit', function(event) {
        //<!----阻止默认行为---->
        event.preventDefault();
        //
        const params = $(this).serialize();
        $.ajax({
            type: 'post',
            url: 'admin/users',
            data: params,
            success: (res) => {
                layer.msg(res.message);
                if (status == 0) {
                    //<!------注册成功清空form-----!>
                    this.reset();
                }
            }
        })
    })
});