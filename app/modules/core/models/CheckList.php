<?php

namespace Mejili\Core\Models;

use Eloquent;

class CheckList extends Eloquent {
    
    protected $table = 'card_checklists';
    
    public function card(){
        return $this->belongsTo('Mejili\Core\Models\Card', 'card_id');
    }
    
    public function items(){
        return $this->hasMany('Mejili\Core\Models\CheckListItem', 'checklist_id');
    }
}