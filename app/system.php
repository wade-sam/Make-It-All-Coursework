<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class system extends Model
{
    public function system_software_relationship(){
        return $this->hasMany(software_details::class);
    }

    public function system_equipment_relationship(){
        return $this->hasMany(equipment::class);
    }

    public function system_os_relationship(){
        return $this->hasMany(operating_system::class);
    }

    public function system_query_relationship(){
        return $this->belongsToMany(problem_query::class);
    }
}
