<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class equipment extends Model
{
    public function equipment_system_relationship(){
        return $this->belongsTo(system::class);
    }
}
