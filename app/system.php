<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class system extends Model
{
    //Each system can have one or more pieces of software
    public function system_software_relationship(){
        return $this->hasMany(software_details::class);
    }
    //Each system can have one or more pieces of hardware
    public function system_equipment_relationship(){
        return $this->hasMany(equipment::class);
    }
    //Each system can have one or more operating systems
    public function system_os_relationship(){
        return $this->hasmany(operating_system::class);
    }

    //A system may be associated with many problemQueries
    public function system_query_relationship(){
        return $this->belongsToMany(problem_query::class);
    }

}
