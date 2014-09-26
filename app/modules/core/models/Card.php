<?php

namespace Mejili\Core\Models;

use Eloquent;

class Card extends Eloquent {
    
    protected $table = 'cards';
    
    protected $hidden = array('list_id, position');
    
    public function cardlist(){
        return $this->belongsTo('CardList', 'list_id');
    }
    
    public function assignee(){
        return $this->belongsTo('User', 'assignee_id');
    }
    
    public function users(){
        return $this->belongsToMany('User', 'card_members', 'card_id', 'member_id');
    }
    
    public function comments(){
        return $this->hasMany('CardComment', 'card_id');
    }
    
    public function activities(){
        return $this->hasMany('CardActivity', 'card_id');
    }
    
    public function checklists(){
        return $this->hasMany('Checklists', 'card_id');
    }
    
    public function attachments(){
        return $this->hasMany('CardAttachment');
    }
    
    
}