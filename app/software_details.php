<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class software_details extends Model
{
    //Software is associated to a system
    public function software_system_relationship(){
        return $this->belongsTo(system::class);
    }
}
