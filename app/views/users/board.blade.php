@extends('layouts.users.default')

@section('navbarHeader')
<div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="{{route('boards')}}"><i class="fa fa-arrow-left"></i> Boards </a>
</div>
@stop
@section('content')
<div class="board">
    <input type="hidden" value="{{$id}}" id="b"/>
    <div class="list-container">
        <ul class="sortable-list" data-bind = "foreach: lists, uiSortableLists: lists">
            <li class="list col-xs-3">
                <div class="widget">
                    <div class="widget-head border-bottom bg-gray dragable-object">
                        <h5 class="innerAll pull-left margin-none" data-bind="text: title"></h5>
                        <div class="pull-right">
                            <a class="text-muted" href="#">    
                                <i class="fa fa-toggle-down innerL"></i>
                            </a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <ul data-bind="foreach: cards, uiSortableCards: cards"  class="sortable-card">
                            <li class="row dragable-object card" data-bind="css: color"> 
                                <div data-bind="text: title"></div>
                            </li>
                        </ul>
                        <div class="addcardButton"><span class="fa fa-plus-circle"></span>
                            Add a Card...
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="list col-xs-3 list-adder">
            <div class="widget">
                <div class="widget-head border-bottom bg-gray">
                    <h5 class="innerAll pull-left margin-none">Add a list...</h5>

                </div>
            </div>
        </div>
    </div>
</div>
@stop