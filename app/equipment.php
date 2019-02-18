<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class equipment extends Model
{
    //A piece of equipment is associated to 1 system
    public function equipment_system_relationship(){
        return $this->belongsTo(system::class);
    }
}
