@extends('content::layouts.users.default')

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
<div class="board" id="board">
    <input type="hidden" value="{{$id}}" id="b"/>
    <div class="list-container">
        <ul class="sortable-list" data-bind = "foreach: lists, uiSortableLists: lists">
            <li class="list col-xs-3">
                <div class="widget">
                    <div class="widget-head border-bottom bg-gray dragable-object">
                        <div class="innerAll pull-left margin-none widget-title" >
                            <div class="title-text" data-bind="text: title"></div>
                            <input class="hide title-input" id="titleInput" data-bind="value: title, valueUpdate: 'keypress'" 
                                   onblur="Mejili.hideTitleInput(event)" onkeyup="Mejili.listTitleKeyUp(event)" />
                        </div>                        
                        <div class="pull-right ctx-menu-target">
                            <a class="text-muted" href="#">    
                                <i class="fa fa-toggle-down innerL"></i>
                            </a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="context-menu hide">
                            <div name="add-card">Add Card</div>
                            <div name="delete" class="delete">Delete List</div>

                        </div>
                        <ul data-bind="foreach: cards, uiSortableCards: cards"  class="sortable-card">
                            <li class="row dragable-object card"> 
                                <div class="card-color" data-bind="css: color"></div>
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
<div class="modal" id="pwdModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" id="modal-dialog">
        <div class="modal-content">
            <div class="form-horizontal" role="form">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="fa fa-remove"><span></button>
                        <span class="header-icon fa fa-credit-card"></span> 
                        <span data-bind="click: Mejili.cardTitleClick" id="cardTitle"> <div class="modal-title" data-bind="text: title"></div> <span> in list </span> <span class="list-title" data-bind="text: parentTitle"></span></span>
                        <span class="hide" id="cardTitleInputParent"> <input type="text" class="cardTitleInput" data-bind="value: title, event: {blur: Mejili.cardTitleBlur, keyup:Mejili.cardTitleKeyUp }"> </span>
                        </div>
                        <div class="modal-body row">
                            <div class="dialog-content card-desc desc-btn col-sm-8" data-bind="css: {hide: description().length > 0}, click: Mejili.descBtnClick">
                                <span class="fa fa-align-left desc-icon"></span>Edit the description... 
                            </div>
                            <div class="dialog-content col-sm-8 card-desc" data-bind="css: {hide: description().length < 1}">
                                <span class="dialog-desc desc-label">Description</span> <span data-bind="click: Mejili.descBtnClick" class="text-btn desc-label">Edit</span>
                                <div class="dialog-desc" data-bind="text: description, click: Mejili.descBtnClick" ></div>
                            </div>
                            <div class="dialog-content col-sm-8 hide" id="cardDesc">
                                <textarea cols="40" rows="5" class="max-width" data-bind="value: description" ></textarea>                                
                            </div>
                            <div class="col-sm-3 pull-right">
                                <div class="window-options">
                                    <div class="dialog-sub-head">Add</div>
                                    <div class="btn btn-default max-width option-btn " id="cardColor">
                                        <span class="fa fa-tag option-icon"></span> Color <span class="fa fa-stop option-icon color-box" data-bind="css: color"></span>
                                    </div>
                                </div>

                                <div class="window-options">
                                    <div class="dialog-sub-head">Actions</div>
                                    <div class="btn btn-default max-width option-btn" name="card-delete" data-bind="click: Mejili.deleteCard">
                                        <span class="glyphicon glyphicon-remove option-icon"></span> Delete
                                    </div>
                                </div>
                            </div>
                            <div class="labels-menu hide">
                                <div class="colors-menu red" name="red" data-bind="click: Mejili.selectCardColor, css: {'glyphicon glyphicon-ok color-selected' :(color()=='red')}"></div>
                                <div class="colors-menu blue" name="blue" data-bind="click: Mejili.selectCardColor, css: {'glyphicon glyphicon-ok color-selected' :(color()=='blue')}"></div>
                                <div class="colors-menu green" name="green" data-bind="click: Mejili.selectCardColor, css: {'glyphicon glyphicon-ok color-selected' :(color()=='green')}"></div>
                                <div class="colors-menu yellow" name="yellow" data-bind="click: Mejili.selectCardColor, css: {'glyphicon glyphicon-ok color-selected' :(color()=='yellow')}"></div>
                                <div class="colors-menu purple" name="purple" data-bind="click: Mejili.selectCardColor, css: {'glyphicon glyphicon-ok color-selected' :(color()=='purple')}"></div>
                                <div class="colors-menu orange" name="orange" data-bind="click: Mejili.selectCardColor, css: {'glyphicon glyphicon-ok color-selected' :(color()=='orange')}"></div>                               
                                <div class="colors-menu"><a href="#" name="" data-bind="click: Mejili.selectCardColor">Remove</a></div>
                            </div>
                        </div>
                        </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        @stop
