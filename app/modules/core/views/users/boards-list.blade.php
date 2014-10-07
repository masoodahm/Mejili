@extends('content::layouts.users.default')

@section('navbarHeader')
<div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#" onclick="Mejili.msgBoardDisabled()"><i class="fa fa-plus-circle"></i> Add Board </a>
</div>
@stop

@section('content')

<div class="container">
    <div class="row">
        @foreach ($boards as $board)
        <a href="b/{{$board->id}}">
            <div class="col-xs-3 board-block"> 
                {{$board->name}} 
            </div>
        </a>

        @endforeach
    </div>
    <br/>
    <div class="row">
        <!--<div>
            <form method="post" action="addboard">
                <input type="text" id="boardName" name="boardName" />
                <button type="submit">Add Board</button>
            </form>
        </div>-->
    </div>
</div>

<div class="modal" id="msgDisModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" id="modal-dialog">
        <div class="modal-content ">
            <div class="form-horizontal" role="form">
                <div class="modal-body bg-info">
                Adding Boards have been disabled for the demo.
                </div>
            </div>
        </div>
    </div>
</div>

@stop
