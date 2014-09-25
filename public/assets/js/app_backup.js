// Only for Development
var self;
window.Mejili = {
    initialize : function(){
        self = this;
        self.setupCards();
        self.setupLists();
        self.setPreferredContainerWidth();
        self.onWindowResize();
        self.setWindowMaxWidth();
        self.setBoardDragable();
        self.setupListAdder();
        self.setupCardAdder();
    },
    setupCards: function(){
        $( ".sortable-card" ).sortable({
            placeholder: "tasks-state-highlight",
            sort: function(event, ui){
                var elem = $(".ui-sortable-helper");
                var plcHolder = $('.tasks-state-highlight');
                var placeholderHeight = (elem.height());
                plcHolder.height(placeholderHeight);
                elem.addClass('elem-dragged');                

            },
            deactivate: function(event, ui){
                $('.elem-dragged').removeClass('elem-dragged');
            },
            connectWith: ".sortable-card"

        });
        $( ".sortable-card" ).disableSelection();  

    },
    setupLists: function(){
        $( ".sortable-list" ).sortable({
            placeholder: "tasks-state-highlight",
            sort: function(event, ui){
                var elem = $(".ui-sortable-helper");
                var plcHolder = $('.tasks-state-highlight');
                var elemWidth = elem.width();
                plcHolder.height(elem.height());                
                plcHolder.width(elemWidth - 7);
                elem.addClass('elem-dragged');
                plcHolder.addClass('col-xs-3');

            },
            deactivate: function(event, ui){
                $('.elem-dragged').removeClass('elem-dragged');
            },
            start: function(){
                $('.list-adder').css('display', 'none');
            },
            stop: function(){
                $('.list-adder').css('display', 'block');
            }
        });
        //$( ".sortable-list" ).disableSelection();  
    },
    onWindowResize: function(){
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
        });/*.css({
            'cursor' : 'grab'
        });*/
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
            Mejili.CurrentBordViewModel.addList(listTitle);
            self.setPreferredContainerWidth();
            self.setupCardAdder();
            self.setupCards();
            self.hideListAdder();
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


            if(!addCardWidgetExists){
                var addCardWidget = document.createElement('div');
                addCardWidget.className = 'row addcardWidget';
                addCardWidget.id = 'addCardWidget';

                var cardDescription = document.createElement('textarea');
                cardDescription.className = 'full-width';
                cardDescription.id = 'cardDescription';

                cardDescription.setAttribute('data-bind', 'text: task');

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
                addCardWidget.find('.cardDescription').focus();
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

            Mejili.CurrentBordViewModel.lists()[listIndex].addCard(cardDescription.val());
            
            self.hideCardAdderWidget($(this));
            cardDescription.val('');
            self.setupCards();
        }
    },
    
    getCurrentListIndex: function(currentElem) {
        var index =-1;
        $('.sortable-list>li').each(function(i){
            if($(this).find(currentElem)!=-1)
            {
                index = i;
            }
        });
        return index;
    }

};

Mejili.CardViewModel = function(){
    this.cardTitle = ko.observable('');
}

Mejili.BoardViewModel = function(){
    this.task = ko.observable();
    this.lists = ko.observableArray();
    
    this.addList = function(title){
        var newList = new Mejili.ListViewModel();
        newList.title = title;
        this.lists.push(newList);
    }
}

Mejili.ListViewModel = function (){
    this.title = ko.observable();
    
    this.cards = ko.observableArray();

    this.addCard = function(cardTitle){
        var newCard = new Mejili.CardViewModel();
        newCard.cardTitle = cardTitle;
        this.cards.push(newCard);

    }
}

Mejili.CurrentBordViewModel = new Mejili.BoardViewModel();

ko.applyBindings(Mejili.CurrentBordViewModel);

$(document).ready(function(){
    Mejili.initialize();
    window.onresize = Mejili.onWindowResize;    

});
