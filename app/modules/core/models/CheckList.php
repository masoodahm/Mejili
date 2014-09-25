<?php

class CheckList extends Eloquent {
    
    protected $table = 'card_checklists';
    
    public function card(){
        return $this->belongsTo('Card', 'card_id');
    }
    
    public function items(){
        return $this->hasMany('CheckListItem', 'checklist_id');
    }
}