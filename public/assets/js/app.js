// Only for Development
//var serverRoot = 'http://localhost/Mejili/public';
//==================================================

var serverRoot = '';
//var serverRoot = 'http://192.168.0.100/Mejili/public';

var self;

window.Mejili = {
    initialize : function(){
        self = this;
        self.setPreferredContainerHeight();
        self.setWindowMaxWidth();
        self.setBoardDragable();
        self.setupListAdder();
        self.getDataFromServer();                
    },
    onWindowResize: function(){
        self.setPreferredContainerHeight();    
    },

    setPreferredContainerHeight: function(){
        var height = window.innerHeight - $('.navbar').height() - 40;
        $('.list-container').css('height',height);    
    },

    setPreferredContainerWidth: function(){
        var listWidth = $('.list').width();
        var listItems = $('.sortable-list>li').length;
        var listContainerPreferredWith = (listItems + 1) * (listWidth + 10);
        $('.list-container').width(listContainerPreferredWith);
    },
    setWindowMaxWidth: function(){
        // set max horizontal pages limit
        var maxPreferredWidth = (screen.width>screen.height? screen.width: screen.height) * 3;
        $('.list-container').css('max-width', maxPreferredWidth);
    },
    setBoardDragable: function(){
        $('.board').mousedown(function (event) {
            if(event.target.className.indexOf('list-container')!=-1){
                $(this)
                .data('down', true)
                .data('x', event.clientX)
                .data('scrollLeft', this.scrollLeft);
                self.hideListAdder();
                self.hideAllTitleInput();                    
                return false;
            }
        }).mouseup(function (event) {
            $(this).data('down', false);
        }).mousemove(function (event) {
            if ($(this).data('down') == true) {
                this.scrollLeft = $(this).data('scrollLeft') + $(this).data('x') - event.clientX;
            }
        });
    },

    setupListAdder : function(){
        $('.list-adder .widget .widget-head').click(function(event){
            var addListWidget = document.getElementById('addListWidget');
            $('.list-adder .widget .widget-head').css('display', 'none');
            if(addListWidget== null){                
                wHead = document.createElement('div');
                wHead.className = 'border-bottom bg-gray';
                titleInput = document.createElement('input');
                wHead.id = 'addListWidget';
                wHead.appendChild(titleInput);
                titleInput.style.width = '100%';
                titleInput.id = 'newListTitle'; 
                self.setupAddListButtons(wHead);
                wHead.onblur = self.hideListAdder;
                $('.list-adder .widget').append(wHead);
                wHead.style.padding = '3px';
            }
            else{
                addListWidget.style.display = 'block';
                document.getElementById('newListTitle').value = '';
            }
        });

    },

    setupAddListButtons: function(listAdder){
        saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.innerHTML = 'Save';
        saveButton.className = 'btn btn-default widgetButton';
        saveButton.onclick = self.addNewList;

        var cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.innerHTML = 'Cancel';
        cancelButton.className = 'btn btn-default widgetButton';
        cancelButton.style.marginLeft = '3px';
        cancelButton.onclick = self.hideListAdder;


        listAdder.appendChild(saveButton);
        listAdder.appendChild(cancelButton);
    },

    addNewList : function(){
        var listTitle = document.getElementById('newListTitle').value;
        if(listTitle!=''){  
            var newList = new Mejili.ListViewModel();
            newList.title(listTitle);
            Mejili.CurrentBordViewModel.lists.push(newList);
            self.setPreferredContainerWidth();
            self.setupCardAdder();
            self.hideListAdder();
            var boardId = document.getElementById('b').value;
            $.ajax(serverRoot + '/api/b/list/add_list', {
                data: 'b=' + boardId + '&t=' + listTitle,
                type: "post",
                success: function(data){
                    newList.id = ko.observable(data.id);
                }
            });
            var menuTarget = $('ul.sortable-list>li:last-child').find('.ctx-menu-target');            
            menuTarget.click(function(){
                self.addListContextMenuTo($(this));    
            });
        }
    },
    hideListAdder : function(){
        $('#addListWidget').css('display', 'none');        
        $('.list-adder .widget .widget-head').css('display', 'block');   

    },
    setupCardAdder: function(){
        $('.addcardButton').click(function(){
            self.cardAdderButtonClick(this);
        });
    },

    cardAdderButtonClick: function(target){
        var addCardWidgetExists = $(target).parent().children().hasClass('addcardWidget');
        $(target).css('display', 'none');

        // hide all other card adder widgets.                        

        if(!addCardWidgetExists){
            var addCardWidget = document.createElement('div');
            addCardWidget.className = 'row addcardWidget';
            addCardWidget.id = 'addCardWidget';
            var cardDescription = document.createElement('textarea');
            cardDescription.className = 'full-width';
            cardDescription.id = 'cardDescription';
            cardDescription.setAttribute('data-bind', 'text: task');
            cardDescription.onkeydown = function(event){
                var keyCode = ('which' in event) ? event.which : event.keyCode;
                if(keyCode == 27){
                    self.hideCardAdderWidget($(target));   
                }
            };
            var btnContainer = document.createElement('div');
            var btnSave = document.createElement('button');
            btnSave.className = 'btn btn-default widgetButton';
            btnSave.innerHTML = 'Save';
            btnSave.onclick = self.addNewCard;

            var btnCancel = document.createElement('button');
            btnCancel.className = 'btn btn-default widgetButton';
            btnCancel.innerHTML = 'Cancel';
            btnCancel.style.marginLeft = '3px';
            btnCancel.onclick = self.cancelCardWidgetAdder;

            btnContainer.appendChild(btnSave);
            btnContainer.appendChild(btnCancel);
            addCardWidget.appendChild(cardDescription);
            addCardWidget.appendChild(btnContainer);
            $(target).before(addCardWidget);
            cardDescription.focus();
        }
        else{
            var addCardWidget = $(target).parent().find('.addcardWidget');
            addCardWidget.css('display', 'block');
            addCardWidget.find('#cardDescription').focus();
        }
    },

    cancelCardWidgetAdder: function(){    
        self.hideCardAdderWidget($(this));
    },

    hideCardAdderWidget : function(context){        
        var addCardWidget = $('.addcardWidget').has(context);
        addCardWidget.parent().find('.addcardButton').css('display', 'block');   
        var cardDescription = addCardWidget.find('#cardDescription');
        addCardWidget.css('display', 'none');        
        cardDescription.val('');  
    },

    addNewCard: function(){
        var addCardWidget = $('.addcardWidget').has($(this));
        var cardDescription = addCardWidget.find('#cardDescription');

        if(cardDescription.val() != ''){
            var listIndex =  self.getCurrentListIndex($(this));
            var newCard = new Mejili.CardViewModel();
            var title = cardDescription.val();
            var listId = Mejili.CurrentBordViewModel.lists()[listIndex].id();
            newCard.title(title);
            var len = Mejili.CurrentBordViewModel.lists()[listIndex].cards().length; 
            Mejili.CurrentBordViewModel.lists()[listIndex].cards.splice( len + 1, 0, newCard);

            $('.widget-body').has($(this)).find('ul>li:last-child').click(function(){
                self.addCardDialog(this);
            });

            self.hideCardAdderWidget($(this));
            cardDescription.val('');
            $.ajax(serverRoot + '/api/b/list/card/add_card', {
                data: '&l=' + listId + '&t=' + title ,
                type: "post",
                success: function(data){
                    newCard.id = ko.observable(data.id);

                }
            });
        }
    },

    getCurrentListIndex: function(currentElem) {
        var index =-1;
        $('.sortable-list>li').each(function(i){
            if($(this).find(currentElem).length > 0)
            {
                index = i;
            }
        });
        return index;
    },
    getDataFromServer : function(){
        var boardId = document.getElementById('b').value;

        $.ajax(serverRoot+'/api/b/view_model',{
            data: 'b='+ boardId,
            type: "post",
            success: self.onServerDataReceive 
        });
    },

    onServerDataReceive: function(data){
        self.sortByPosition(data);
        Mejili.CurrentBordViewModel = ko.mapping.fromJS(data);
        var board = document.getElementById('board');
        ko.applyBindings(Mejili.CurrentBordViewModel, board);
        self.setupCardAdder();
        self.setPreferredContainerWidth();        
        self.setWidgetTitleEditable();
        self.setListContextMenu();
        self.setupCardEditingDialog();        
    },

    setListContextMenu : function(){
        $('.ctx-menu-target').click(function(event){
            self.addListContextMenuTo($(this));
        });
    },

    addListContextMenuTo: function(ctx){
        var menu = ctx.parent().siblings().find('.context-menu');
        $('.context-menu').not(menu).addClass('hide');
        menu.toggleClass('hide');
        menu.find('[name="delete"]').click(function(){
            var list = Mejili.CurrentBordViewModel.lists()[self.getCurrentListIndex(this)];
            var id = list.id();
            Mejili.CurrentBordViewModel.lists.remove(list);
            menu.addClass('hide');
            self.setPreferredContainerWidth();
            $.ajax(serverRoot + '/api/b/list/delete', {
                data: 'lid=' + id,
                type: "post"
            });
        });
        menu.find('[name="add-card"]').click(function(){
            self.cardAdderButtonClick(ctx.parent().siblings().find('.addcardButton'));
            menu.addClass('hide');
        });
    },

    sortByPosition: function(data){
        data.lists.sort(self.positionComparator);
        for(var l=0; l< data.lists.length;l++)
        {
            var list = data.lists[l];
            list.cards.sort(self.positionComparator);
        }
    },
    positionComparator : function(a, b){
        if (a.position < b.position)
            return -1;
        if (a.position > b.position)
            return 1;
        return 0;
    },

    listTitleKeyUp: function(event){
        event.which = event.which || event.keyCode;    
        if(event.which == 13) {
            if(event != null){    
                event.preventDefault();
                self.hideTitleInput(event.target);
            }
        }
    },

    hideTitleInput : function(target){
        var $target = $(target);    
        $target.addClass('hide');
        var parent = $target.parent();
        parent.find('.title-text').removeClass('hide');
        parent.addClass('innerAll'); 

        var listId = Mejili.CurrentBordViewModel.lists()[self.getCurrentListIndex(target)].id();        
        $.ajax(serverRoot + '/api/b/list/setTitle', {
            data: 'lTitle=' + $target[0].value + '&lid=' +  listId,
            type: 'post'
        });
    },

    hideAllTitleInput: function(){
        var target = $('.title-input').not('.hide')[0];
        self.hideTitleInput(target);
    },

    setWidgetTitleEditable: function(){
        $('.title-text').click(function (event){
            $(this).addClass('hide');
            var parent = $(this).parent();
            var titleInp = parent.find('#titleInput');
            titleInp.removeClass('hide');
            titleInp.focus();            
            parent.removeClass('innerAll');            
        });
    },

    setupCardEditingDialog: function(){
        $('.card').click(function(event){            
            self.addCardDialog(this);
        });

        self.setCardColorsMenu();
    },
    addCardDialog: function(ctx){
        var list = Mejili.CurrentBordViewModel.lists()[self.getCurrentListIndex(ctx)];
        var index = $(ctx).index();
        var dialog = document.getElementById('modal-dialog');
        var dialogViewModel = list.cards()[index];
        dialogViewModel.parentTitle = list.title();
        dialogViewModel.parent = list;
        ko.cleanNode(dialog);
        ko.applyBindings(dialogViewModel, dialog);

        $('#pwdModal').modal();

        $('#pwdModal').on('hidden.bs.modal', function () {
            $('.labels-menu').addClass('hide');
            $('#cardDesc').addClass('hide');
        });

        $('#cardDesc > textarea').blur(function(){
            $('#cardDesc').addClass('hide');
            if(this.value == ''){
                $('.card-desc.desc-btn').removeClass('hide');
            }else{
                $('.card-desc').not('.desc-btn').removeClass('hide');
            }

            $.ajax(serverRoot + '/api/b/list/card/updateDescription', {
                data: 'cid=' + dialogViewModel.id() + '&cardDesc=' + this.value,
                type: 'post'
            });

        });
    },

    descBtnClick : function (){
        $('.card-desc').addClass('hide');
        var cardDesc = $('#cardDesc');
        cardDesc.removeClass('hide');
        cardDesc.find('textarea').focus();
    },

    setCardColorsMenu: function(){
        var btn = document.getElementById('cardColor');
        btn.onclick = function(event){
            $('.labels-menu').toggleClass('hide');            
        };
    },

    selectCardColor: function(card, event){
        var color = event.target.attributes['name'].value;
        card.color(color);
        var colorDropDown = $('.labels-menu');
        colorDropDown.addClass('hide');
        $.ajax(serverRoot + '/api/b/list/card/setColor', {
            data: 'cid=' + card.id() + '&clr=' + color,
            type: 'post'
        });
    },
    deleteCard: function(card, event){
        card.parent.cards.remove(card);
        $('#pwdModal').modal('hide');
        $.ajax(serverRoot + '/api/b/list/card/delete', {
            data: 'cid=' + card.id(),
            type: "post"
        });
    },

    cardTitleClick: function(card, event){
        var target = event.currentTarget;
        $target = $(target);
        $target.addClass('hide');
        var cardTitleInput = $('#cardTitleInputParent');
        cardTitleInput.removeClass('hide');
        var editableInput = cardTitleInput.find('input')[0];
        editableInput.focus();        
    },

    cardTitleBlur: function(card, event){
        var target = event.target;
        $target = $(target).parent();
        $target.addClass('hide');
        $('#cardTitle').removeClass('hide');

        $.ajax(serverRoot + '/api/b/list/card/updateTitle', {
            data: 'cid=' + card.id() + '&cardTitle=' + card.title(),
            type: 'post'
        });
    },
    
    cardTitleKeyUp: function(card, event){
        event.which = event.which || event.keyCode;    
        if(event.which == 13) {
            if(event != null){    
                event.preventDefault();
                self.cardTitleBlur(card, event);
            }
        }
    },
    msgBoardDisabled: function(){
        $('#msgDisModal').modal();        
    }


};

ko.bindingHandlers.uiSortableCards = {
    init: function (element, valueAccessor, allBindingsAccesor, context) {
        var $element = $(element);
        var list = valueAccessor();

        $element.sortable({
            placeholder: "tasks-state-highlight",
            sort: function(event, ui){
                var elem = $(".ui-sortable-helper");
                var plcHolder = $('.tasks-state-highlight');
                var elemWidth = ui.item.width();
                plcHolder.height(ui.item.outerHeight());         
                elem.addClass('elem-dragged');                

            },
            deactivate: function(event, ui){
                $('.elem-dragged').removeClass('elem-dragged');
            },

            start: function(event, ui){
                oldIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);
                oldList = Mejili.getCurrentListIndex(ui.item.parent());
            },
            stop : function(event, uib){
                newIndex = ko.utils.arrayIndexOf(uib.item.parent().children(), uib.item[0]);
                var newList = Mejili.getCurrentListIndex(uib.item);
                var srcListModel = Mejili.CurrentBordViewModel.lists()[oldList];
                var moveCardSrc = srcListModel.cards.splice(oldIndex,1)[0];                
                Mejili.CurrentBordViewModel.lists()[newList].cards.splice(newIndex, 0,moveCardSrc);

                // remove duplicates caused by jquery ui sortable.
                uib.item.remove();
                var nid = Mejili.CurrentBordViewModel.lists()[newList].id();
                $.ajax(serverRoot + '/api/b/list/card/updatePosition',{
                    data: '&nl='+nid + '&np=' + newIndex + '&cid=' + moveCardSrc.id(),
                    type: "post",
                    success: function(data){
                        if(data.success){
                            moveCardSrc.position = newIndex;
                        }
                    }
                });
            },
            connectWith: ".sortable-card"
        });
    },

    update: function (element, valueAccessor, allBindingsAccesor, context) {
        var $element = $(element);
        var list = valueAccessor();
        $element.click(function(event){
            if(event.target == event.currentTarget) return;
            Mejili.addCardDialog($(event.target).parent());
        });
    }
    
}; 

ko.bindingHandlers.uiSortableLists = {
    init: function (element, valueAccessor, allBindingsAccesor, context) {
        var $element = $(element);
        var list = valueAccessor();
        $element.sortable({
            placeholder: "tasks-state-highlight",
            sort: function(event, ui){
                var elem = $(".ui-sortable-helper");
                var plcHolder = $('.tasks-state-highlight');
                var elemWidth = ui.item.width();
                plcHolder.height(ui.item.height());                
                plcHolder.width(elemWidth - 7);
                elem.addClass('elem-dragged');
                plcHolder.addClass('col-xs-3');             
            },
            deactivate: function(event, ui){
                $('.elem-dragged').removeClass('elem-dragged');
            },
            start: function(event, ui){
                $('.list-adder').css('display', 'none');
                oldIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);                
            },            
            stop : function(event, uib){
                $('.list-adder').css('display', 'block');
                newIndex = ko.utils.arrayIndexOf(uib.item.parent().children(), uib.item[0]);                
                var listParent = Mejili.CurrentBordViewModel.lists();
                var moveListSrc = listParent.splice(oldIndex,1)[0];
                listParent.splice(newIndex, 0, moveListSrc);
                var b = document.getElementById('b').value;
                $.ajax(serverRoot+'/api/b/list/updatePosition', {
                    data : 'b=' + b + '&np=' + newIndex + '&lid=' + moveListSrc.id(),
                    type: "post",
                    success: function(data){
                        if(data.success){
                            moveListSrc.position = newIndex;
                        }
                    }
                });              
            }
        });
    }
};

Mejili.CardViewModel = function(){
    this.title = ko.observable();
    this.color = ko.observable('');
    this.description = ko.observable('');
};

Mejili.BoardViewModel = function(){
    this.lists = ko.observableArray();
};

Mejili.ListViewModel = function (){
    this.title = ko.observable();
    this.cards = ko.observableArray();
};

$(document).ready(function(){
    Mejili.initialize();
    window.onresize = Mejili.onWindowResize;        

});