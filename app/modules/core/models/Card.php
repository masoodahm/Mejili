<?php

namespace Mejili\Core\Models;

use Eloquent;

class Card extends Eloquent {
    
    protected $table = 'cards';
    
    protected $hidden = array('list_id, position');
    
    public function cardlist(){
        return $this->belongsTo('Mejili\Core\Models\CardList', 'list_id');
    }
    
    public function assignee(){
        return $this->belongsTo('Mejili\Core\Models\User', 'assignee_id');
    }
    
    public function users(){
        return $this->belongsToMany('Mejili\Core\Models\User', 'card_members', 'card_id', 'member_id');
    }
    
    public function comments(){
        return $this->hasMany('Mejili\Core\Models\CardComment', 'card_id');
    }
    
    public function activities(){
        return $this->hasMany('Mejili\Core\Models\CardActivity', 'card_id');
    }
    
    public function checklists(){
        return $this->hasMany('Mejili\Core\Models\Checklists', 'card_id');
    }
    
    public function attachments(){
        return $this->hasMany('Mejili\Core\Models\CardAttachment');
    }
    
    
}