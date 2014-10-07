
@extends('content::layouts.guest.default')
@section('content')

<div class="container login-box-width">
    <div class="login-box center-block ">
        <form role="form" class="form-horizontal" method="post" action="login">
            <p class="title">Use your username</p>
            <div class="form-group">
                <label class="control-label sr-only" for="username">Username</label>
                <div class="col-sm-12">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="username" name="username"/>
                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                    </div>
                </div>
            </div>
            <label class="control-label sr-only" for="password">Password</label>
            <div class="form-group">
                <div class="col-sm-12">
                    <div class="input-group">
                        <input type="password" class="form-control" placeholder="password" name="password"/>
                        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                    </div>
                </div>
            </div>
            <div class="input-group">
                <input type="checkbox" id="rememberMe" name="rememberMe"/>
                <label class="control-label" for="rememberMe">Remember me next time</label>
            </div>

            <div class="pull-right">
                <button class="btn btn-primary btn-sm"><i class="fa fa-arrow-circle-o-right"></i> Login</button>       
            </div>


        </form>

        <div class="links">
            <div><a href="#">Forgot Username or Password?</a></div>
            <div><a href="#">Create New Account</a></div>
        </div>
    </div>
</div>
@stop
