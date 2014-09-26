<?php

namespace Mejili\Core\Models;

use Eloquent;

class CheckListItem extends Eloquent {
    
    protected $table = 'checklist_items';
    
    public function checklist(){
        return $this->belongsTo('CheckList', 'checklist_id');
    }
}