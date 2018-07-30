<template>
    <div class="login">
        <div class="login-box">
            <div class="login-box-top-bg"></div>
            <slot class="input-group"></slot>
            <div class="nav-bottom">
                <div class="right">
                    <span><a href="javascript:void(0)">用户注册</a></span>
                    <span><a href="javascript:void(0)">忘记密码</a></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoginLayout',
};
</script>

<style lang="scss" scoped>
$breakpoints: (
    'xs': 'only screen and ( max-width: 480px)',
    'sm': 'only screen and ( max-width: 768px) and ( min-width: 480px)',
    'md': 'only screen and ( min-width: 992px)',
    'lg': 'only screen and ( min-width: 1200px)',
) !default;
@mixin respond-to($breakpoint) {
    $query: map-get($breakpoints, $breakpoint);
    @if not $query {
        @error 'No value found for `#{$breakpoint}`'
        + '. Please make sure it is defined in `$breakpoints` map.';
    }
    @media #{if(type-of($query) == 'string', unquote($query), inspect($query))} {
        @content;
    }
}
.login {
    height: 100%;
    background: url('../assets/login_bg.jpg') no-repeat;
    background-size: 100% 100%;
    .login-box {
        max-width: 500px;
        @include respond-to(xs) {
            width: 100%;
        }
        @include respond-to(sm) {
            width: 60%;
            padding-top: 10%;
        }
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        border: 1px solid #eee;
        border-radius: 20px;
        padding: 20px;
        padding-top: 15%;
        box-sizing: border-box;
        .login-box-top-bg {
            @include respond-to(sm) {
                display: none;
            }
            @include respond-to(xs) {
                display: none;
            }
            position: absolute;
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
            width: 25%;
            height: 0;
            padding-bottom: 25%;
            border-radius: 50%;
            background: url('../assets/login.gif') no-repeat;
            background-size: 100% 100%;
        }
        >.input-group {
            .el-form-item{
            div,
            input {
                background-color: transparent !important;
                &:focus {
                border-color: #85c;
                }
            }
            }
        }
        .nav-bottom {
            >div {
                margin-top: 10px;
                a {
                    color: #9cc;
                    line-height: 24px;
                    margin-right: 10px;
                }
            }
        }
    }
}
.left {
    float: left;
}
.right {
    float: right;
}
a {
    color: #000;
    text-decoration: none;
}
</style>
