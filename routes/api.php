<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Routes for the backend
Route::post('query/store', 'Api\QueryController@store');//modifying the store route

Route::put('query/update/{}','Api\QueryController@update');

//routes for the dashboard
Route::get('dashboard/queriesOverview','Api\QueryController@queriesOverview');
Route::get('dashboard/specialistsStatus','Api\QueryController@specialistsStatus');

//routes for the operator page
Route::get('operators/status','Api\QueryController@operatorStatus');

//routes for the assets page
Route::get('assets/hardware','Api\QueryController@assetsHardware');
Route::get('assets/software','Api\QueryController@assetsSoftware');
Route::get('assets/os','Api\QueryController@assetsOS');

//creating all the CRUD routes in the QueryController
Route::resource('query','Api\QueryController');

//Routes for hte create/edit query page
Route::get('display/operator','Api\QueryController@showOperatorsQuery');
Route::get('display/specialist','Api\QueryController@showSpecialistsQuery');
Route::get('query/create/system','Api\QueryController@showSystemQuery');
Route::get('query/display/equipment/{equipment}','Api\QueryController@showEquipmentQuery');
Route::get('query/display/os/{os}','Api\QueryController@showOSQuery');
Route::get('query/display/software/{software}','Api\QueryController@showSoftware');

//Routes for the login as well as updating the active or inactive statuses
Route::get('login','Api\QueryController@login');
Route::get('login/active/{active}','Api\QueryController@updateStatusActive');
Route::get('login/inactive/{inactive}','Api\QueryController@updateStatusInactive');


Route::get('delete/{delete}','Api\QueryController@destroy');

//creating and viewing messages routes
Route::get('message/view/{view}','Api\QueryController@ViewMessages');
Route::post('message/create','Api\QueryController@createMessages');

//analytics routes
Route::get('analytics/queriesToday','Api\QueryController@queriesPerDay');
Route::get('analytics/closeWeek','Api\QueryController@specialistClosePerWeek');
Route::get('analytics/typeWeek','Api\QueryController@problemType');


