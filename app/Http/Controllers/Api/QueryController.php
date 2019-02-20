<?php

namespace App\Http\Controllers\Api;

use App\message;
use App\personel;
use Carbon\Carbon;
use Dotenv\Validator;
use function GuzzleHttp\Psr7\get_message_body_summary;
use Illuminate\Support\Facades\DB;
use App\problem_query;
use App\system;
use function GuzzleHttp\Promise\all;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;



class QueryController extends Controller
{
    //This is used to list all the queries on the Queries page
    public function index()
    {
        problem_query::all();
        $queries = problem_query::all();
        return response()->json($queries);

    }

    //fetches the priorities for each query from te problem_queries table
    public function queriesOverview(){
        $queryPriority = DB::table('problem_queries')
            ->select('problem_queries.query_id','problem_queries.priority')
            ->get();
        return response()->json($queryPriority);
    }

    //Fetches the  query and the name, status, due date, name, phone number, email and the status of all specialists. Displays them on the dashboard
    public function specialistsStatus(){
        $specialists = DB::table('problem_queries')
            ->join('personel','personel.name','=','problem_queries.specialist_name AS name')
            ->select('problem_queries.query_id','problem_queries.status','problem_queries.due_date','personel.name',
                'personel.tel_number','personel.email','personel.personel_status')
            ->get();
        return response()->json($specialists);
        }

    //same as above but for operators. Accesses data from the personel table
    public function operatorStatus(){

        $operators = DB::table('problem_queries')
            ->join('personel','personel.name','=','problem_queries.operator_name AS name')
            ->select('problem_queries.query_id','problem_queries.status','problem_queries.due_date','personel.name',
                'personel.tel_number','personel.personel_status')
            ->get();
        return response()->json($operators);
    }


    //fetches the equipment type, make and serial number and displays on the assets page
    public function assetsHardware(){
        $hardware = DB::table('equipment')
            ->select('equipment.type','equipment.make', 'equipment.serial_number')
            ->get();
        return response()->json($hardware);
        }

        //fetches the software name and licence and displays them on the assets page
        public function assetsSoftware(){
        $software = DB::table('software_details')
            ->select('software_details.software_name','software_details.software_licence')
            ->get();

        return response()->json($software);
        }

        //fetches the operating systems and displays them on the assets page
        public function assetsOS(){
        $os = DB::table('operating_systems')
            ->select('operating_systems.os_name')
            ->get();
            return response()->json($os);
        }


    public function create()
    {
        //
    }

    public function ViewMessages($id){
        $message = DB::table('messages')
            ->select('content','creator','created_at')
            ->where('messages.query_id','=',$id)
            ->get();
        return response()->json($message);
    }

    public function CreateMessages(Request $request){
        $create = new App\message;
        $create->content = $request->input('content');
        $create->creator = $request->input('creator');
        $create->query_id = $request->input('query_id');
        $create->save();

        return 'Success';
    }

    //takes the data from the create query form and inputs it as a new query into the problem_queries table
    public function store(Request $request)
    {
        $query = new \App\problem_query;

        $query->title = $request->input('title');
        $query->description = $request->input('desc');
        $query->notes = $request ->input('notes');
        $query->type = $request ->input('type');
        $query->priority = $request ->input('priority');
        $query->system_component = $request->input('hardware');
        $query->system_name = 'PC-02';//$request ->input('system');
        $query->software_name = $request->input('software');
        $query->os_name = $request->input('OS');
        $query->operator_name = $request->input('operator');
        $query->specialist_name = $request->input('specialist');
        $query->caller_name = $request->input('caller');
        $query->due_date = $request->input('due');
        $query->status = 'open';
        $query->save();

        return 'Success';//if succesfull returns this
    }

    //This is used to show the individual query. Will be used in the ExpandedQuery.js file

    //shows an individual query based on the query that is clicked on in the queries page. Does so by the query_id
    public function show($id)
    {
        $ShowQuery=problem_query::find($id);

        return response()->json($ShowQuery);
    }

    //checks the column type for the operator in the personell table and displays them back. Is shown in the create/edit query page
    public function showOperatorsQuery(){
        $operator = DB::table('personel')->where('type','Operator')->get();
        return response()->json($operator);
    }

    //Checks the same table as above but checks for specialists instead of operators
    public function showSpecialistsQuery(){
        $specialist = DB::table('personel')->where('type','Specialist')->get();
        return  response()->json($specialist);
    }

    //links with the system drop down box in the create/edit queries page. displays all system names
    public function showSystemQuery(){
        $system = DB::table('workstations')->select('system_name')->get();
        return response()->json($system);
    }

    //Finds all the equipment associated with a system, by taking the result of the showSystemQuery as input
    public function showEquipmentQuery($id){
        $equipment = DB::table('systems')
            ->join('equipment','equipment.serial_number',
                '=','systems.equipment_serial_number')
            ->select('equipment.serial_number','equipment.type','equipment.make')
            ->where('systems.system_name','=',$id)
            ->get();
        return response()->json($equipment);
    }

    // Does the same as above but for the operating system
    public function showOSQuery($id){
        $OS = DB::table('systems')
            ->select('operating_system_name')
            ->where('systems.system_name', '=',$id)
            ->first();
        return response()->json($OS);
    }

    //Same as above but for the software liked to a system
    public function showSoftware($id){
        $software = DB::table('systems')
            ->select('software_name')
            ->where('systems.system_name','=',$id)
            ->get();
        return response()->json($software);
    }

    //fetching all the login information for the front end. links with the login page
    public function login(){
        $login = DB::table('personel')
            ->select('personel.name','personel.type','personel.username','personel.password')
            ->get();
           // updateStatus(DB::table(personel));
            return response()->json($login);


    }

    public function updateStatusActive($id){
        $login = personel::find($id);
        $login->personel_status = 'Active';
        $login->save();
        return('success');

    }

    public function updateStatusInactive($id){
        $login = personel::find($id);
        $login->personel_status = 'Inactive';
        $login->save();
        return('success');

    }

    public function queriesPerDay(){
        $currentTime = Carbon::today();
        $query = DB::table('problem_queries')
            ->select('problem_queries.query_id')
            ->where('problem_queries.created_at','>=',$currentTime)
            ->get();
        $query->count();
            return response()->json($query->count());
    }

    public function specialistClosePerWeek(){
        $currentWeek = Carbon::now();
        $currentWeek->startOfWeek();
        $query = DB::table('problem_queries')
            ->select('problem_queries.specialist_name')
            ->orderBy('problem_queries.specialist_name')
            ->where('problem_queries.status','=','Closed')
            ->where('problem_queries.created_at','>=',$currentWeek)
            ->get();
        return response()->json($query->count());
    }
    public function problemType(){
        $currentWeek = Carbon::now();
        $currentWeek ->startOfWeek();
        $query = DB::table('problem_queries')
            ->select('problem_queries.type')
            ->orderBy('problem_queries.type')
            ->where('problem_queries.created_at','>=',$currentWeek)
        ->get();
        return response()->json($query);
    }

    public function TimeToComplete(){
        $query = DB::table('problem_queries')
            ->select('problem_queries.created');
    }

    public function specialistQueries($id){
        $query = DB::table('problemQueries')
            ->select('problem_queries.');
    }



    public function edit($id)
    {

    }
    //Links to the edit query page. Validates and Checks that all necessary inputs in the form have been filled, then
    //links them to the columns in the problem_Query and updates them.
    public function update(Request $request, $id)
    {
        /*(
        $this->validate(request(),[
           'title'=> 'required',
            'desc'=>'required',
            'notes'=>'required',
            'type'=>'required',
            'priority'=>'required',
            'hardware'=>'required',
            'software'=>'required',
            'OS'=>'required',
            'operator'=>'required',
            'specialist'=>'required',
            'due'=>'required',
            'caller'=>'required',
            'system'=>'required',
            'priority'=>'required',
            'status'=>'required'
        ]);
        */
        $update_query = \App\problem_query::find('5');
        $update_query->title = $request->input('title');
        $update_query->description = $request->input('description');
        $update_query->notes = $request->input('notes');
        $update_query->type = $request->input('type');
        $update_query->priority = $request->input('priority');
        $update_query->system_component = $request->input('system_component');
        $update_query->software_name = $request->input('software_name');
        $update_query->os_name = $request->input('os_name');
        $update_query->operator_name = 'sam wade';//$request->input('operator_name');
        $update_query->specialist_name = $request->input('specialist_name');
        $update_query->status = $request->input('status');
        $update_query->due_date = $request->input('due_date');
        $update_query->caller_name = $request->input('caller_name');
        $update_query->system_name = $request->input('system_name');
        $update_query->updated_at = Carbon::now();
        $update_query->save();
        return ('success');
    }
/*
    public function login(Request $request){
        if (personel::where('username',$))
    }
*/



//Deleting a record
    public function destroy($id)
    {
        $delete = problem_query::where('query_id',$id)->delete();
        return response()->json('Succesfull');
    }
}
