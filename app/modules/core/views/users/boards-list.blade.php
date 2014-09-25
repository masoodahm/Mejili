@extends('content::layouts.users.default')
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
        <div>
            <form method="post" action="addboard">
                <input type="text" id="boardName" name="boardName" />
                <button type="submit">Add Board</button>
            </form>
        </div>
    </div>
</div>
@stop
