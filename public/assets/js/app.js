// Only for Development
var serverRoot = 'http://localhost/Mejili/public';
//==================================================

//var serverRoot = '';

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
                titleInput.id = 'titleInput'; 

                self.setupAddListButtons(wHead);

                wHead.onblur = self.hideListAdder;
                $('.list-adder .widget').append(wHead);
                wHead.style.padding = '3px';
            }
            else{
                addListWidget.style.display = 'block';
                document.getElementById('titleInput').value = '';
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
        var listTitle = document.getElementById('titleInput').value;
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
        }
    },
    hideListAdder : function(){
        $('#addListWidget').css('display', 'none');        
        $('.list-adder .widget .widget-head').css('display', 'block');   

    },
    setupCardAdder: function(){
        $('.addcardButton').click(function(){

            var addCardWidgetExists = $(this).parent().children().hasClass('addcardWidget');
            $(this).css('display', 'none');

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
                        self.hideCardAdderWidget($(this));   
                    }
                }

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
                $(this).before(addCardWidget);
                cardDescription.focus();
            }
            else{
                var addCardWidget = $(this).parent().find('.addcardWidget');
                addCardWidget.css('display', 'block');
                addCardWidget.find('#cardDescription').focus();
            }

        });
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
            Mejili.CurrentBordViewModel.lists()[listIndex].cards.push(newCard);

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
                var moveCardSrc = srcListModel.cards().splice(oldIndex,1)[0];
                Mejili.CurrentBordViewModel.lists()[newList].cards().splice(newIndex, 0, moveCardSrc);                
                var nid = Mejili.CurrentBordViewModel.lists()[newList].id();

                $.ajax(serverRoot + '/api/b/list/card/updatePosition',{
                    data: '&nl='+nid + '&np=' + newIndex + '&cid=' + moveCardSrc.id(),
                    type: "post"                    
                });
            },
            connectWith: ".sortable-card"
        });

        $element.click(function(event){
            if(event.target == event.currentTarget) return;
            var list = ko.unwrap(valueAccessor());
            var index = $(event.currentTarget).children().index($(event.target).parent());
            var dialog = document.getElementById('modal-dialog');
            dialogViewModel = list[index];
            dialogViewModel.parentTitle = context.title;
            
            ko.cleanNode(dialog);
            ko.applyBindings(dialogViewModel, dialog);
            $('#pwdModal').modal();
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
    this.color = ko.observable();
}

Mejili.BoardViewModel = function(){
    this.lists = ko.observableArray();
}


Mejili.ListViewModel = function (){
    this.title = ko.observable();
    this.cards = ko.observableArray();
}

$(document).ready(function(){
    Mejili.initialize();
    window.onresize = Mejili.onWindowResize;    
});
