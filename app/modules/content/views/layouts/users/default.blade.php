<html>
    <head>
        <link href="{{ asset('assets/css/libs/font-awesome.min.css')}}" rel="stylesheet"/>
        <link href="{{ asset('assets/css/libs/bootstrap.min.css')}}" rel="stylesheet"/>
        <link href="{{ asset('assets/css/app.css')}}" rel="stylesheet"/>
        <title>Mejili - Kanban Board</title>
    </head>
    <body>

        <nav class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                
                   @yield('navbarHeader')
                <div id="navbar-main" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">                        
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-user">
                                <!--<li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                                </li>
                                <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                                </li>
                                <li class="divider"></li>-->
                                <li><a href="{{route('logout')}}"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                                </li>
                            </ul>
                            <!-- /.dropdown-user -->
                        </li>
                    </ul>

                </div>
            </div>

        </nav>

        @yield('content')

        <script src="{{ asset('assets/js/libs/jquery-1.11.1.min.js')}}" type="text/javascript"></script>
        <script src="{{ asset('assets/js/libs/jquery-ui.min.js')}}" type="text/javascript"></script>
        <script src="{{ asset('assets/js/libs/jquery.ui.touch-punch.min.js')}}" type="text/javascript"></script>
        <script src="{{ asset('assets/js/libs/bootstrap.min.js')}}" type="text/javascript"></script>
        <script src="{{ asset('assets/js/libs/knockout-3.2.0.js')}}" type="text/javascript"></script>  
        <script src="{{ asset('assets/js/libs/knockout.mapping.js')}}" type="text/javascript"></script>  
        <script src="{{ asset('assets/js/libs/jquery.jeditable.mini.js')}}" type="text/javascript"></script>  
        <script src="{{ asset('assets/js/app.js')}}" type="text/javascript"></script>

    </body>
</html>