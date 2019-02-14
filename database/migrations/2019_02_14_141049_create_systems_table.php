<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSystemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('systems', function (Blueprint $table) {
            $table->string('system_name');
            $table->string('equipment_serial_number');
            $table->foreign('equipment_serial_number')->references('serial_number')->on('equipment');
            $table->string('operating_system_name');
            $table->foreign('operating_system_name')->references('os_name')->on('operating_systems');
            $table->string('software_name');
            $table->foreign('software_name')->refernces('software_name')->on('software_details');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('systems');
    }
}
