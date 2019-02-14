<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class operating_system extends Model
{
    public function os_system_relationship(){
        return $this->belongsTo(system::class);
    }
}
