import React, {Component} from 'react';
import { Input, Dropdown, Form, TextArea } from 'semantic-ui-react'

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import axios from "axios";


class AddQuery extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            currentId: document.URL.split("/")[4],
            title: '',
            type: '',
            hardware: '',
            desc: '',
            notes: '',
            software: '',
            OS: '',
            reporter_name: '',
            operator_name: '',
            due: '',
            priority: '',
            specialist: '',
            status: '',
            disabled: true,
            types: [
                { key: 'OS', text: 'OS', value: 'OS' },
                { key: 'hardware', text: 'Hardware', value: 'Hardware' },
                { key: 'software', text: 'Software', value: 'Software' },
            ],
            priorities: [
                { key: 'high', text: 'High', value: 'High' },
                { key: 'medium', text: 'Medium', value: 'Medium' },
                { key: 'low', text: 'Low', value: 'Low' },
            ],
            statuses: [
                { key: 'open', text: 'open', value: 'open' },
                { key: 'closed', text: 'closed', value: 'closed' }
            ],
            hardwares: [],
            softwares: [],
            OSs: [],
            operators: [],
            specialists: [],
            queryData: {},
        }
    }

    componentWillMount() {
        // Get individual query's data from API
        axios.get(`/api/query/${this.state.currentId}`).then(res => {
            // Save the API response in state to later display it on the front-end
            this.setState({
                title: res.data.title,
                type: res.data.type,
                hardware: res.data.system_name,
                desc: res.data.description,
                notes: res.data.notes,
                software: res.data.software_name,
                OS: res.data.os_name,
                reporter_name: res.data.caller_name,
                operator_name: res.data.operator_name,
                due: res.data.due_date,
                priority: res.data.priority,
                specialist: res.data.specialist_name,
                status: res.data.status,
            })
        }).catch(err => {
            console.log(err);
        });

        // Get Hardware Items from API
        axios.get('/api/assets/hardware').then(res => {
            const hardwares = res.data;

            hardwares.map((hardware, i) => {
                this.setState({
                    hardwares: [...this.state.hardwares,
                        {key: i, text: `${hardware.type} ${hardware.make}`, value: `${hardware.type} ${hardware.make}`}
                    ]
                });
            });
        }).catch(err => {
            console.log(err);
        });

        // Get Software Items from API
        axios.get('/api/assets/software').then(res => {
            const softwares = res.data;

            softwares.map((software, i) => {
                this.setState({
                    softwares: [...this.state.softwares,
                        {key: i, text: software.software_name, value: software.software_name}
                    ]
                });
            });

        }).catch(err => {
            console.log(err);
        });

        // Get OS Items from API
        axios.get('/api/assets/os').then(res => {
            const OSs = res.data;

            OSs.map((OS, i) => {
                this.setState({
                    OSs: [...this.state.OSs,
                        {key: i, text: OS.os_name, value: OS.os_name}
                    ]
                });
            });
        }).catch(err => {
            console.log(err);
        });

        // Get Operators from API and use only the active ones
        axios.get('/api/operators/status').then(res => {
            const activeOperators = res.data.filter(operator => operator.personel_status === 'Active');

            activeOperators.map((operator, i) => {
                this.setState({
                    operators: [...this.state.operators,
                        {key: i, text: operator.name, value: operator.name}
                    ]
                });
            });
        }).catch(err => {
            console.log(err);
        });

        // Get Specialists from API and use only the active ones
        axios.get('/api/dashboard/specialistsStatus').then(res => {
            const activeSpecialists = res.data.filter(specialist => specialist.personel_status === 'Active');

            activeSpecialists.map((specialist, i) => {
                this.setState({
                    specialists: [...this.state.specialists,
                        {key: i, text: specialist.name, value: specialist.name}
                    ]
                });
            });
        }).catch(err => {
            console.log(err);
        })
    }

    editQuery() {
        this.setState({
            disabled: false
        })
    }

    saveQuery() {
        const updatedQuery = {
            title: this.state.title,
            query_id: this.state.currentId,
            description: this.state.desc,
            notes: this.state.notes,
            type: this.state.type,
            system_name: this.state.hardware,
            system_component: this.state.hardware,
            software_name: this.state.software,
            os_name: this.state.OS,
            due_date: this.state.due,
            caller_name: this.state.reporter_name,
            operator_name: this.state.operator_name,
            specialist_name: this.state.specialist,
            priority: this.state.priority,
            status: this.state.status,
            created_at: '2019-02-05 00:00:00',
            updated_at: '2019-02-05 00:00:00',
        };

        // operator_name":"Cassius McKernan","specialist_name":"Edmund Blaber","caller_name":"Maegan Cunnington","title":"Microsoft Word Doesn't ' +
        // 'Save","description":"When i click save, it freezes","notes":"possible, HDD problem?",' +
        // '"type":"Software","system_name":"PC-01","system_component":"","software_name":"FL Studio 20","os_name":"",' +
        // '"due_date":"2019-02-13","priority":"Low","status":"Open","created_at":"2019-02-05 00:00:00","updated_at":"2019-02-05 00:00:00"}

        this.setState({
            disabled: true,
        });

        console.log(updatedQuery);

        axios.put(`/api/query/update/${updatedQuery.query_id}`, {
            updatedQuery
        })
            .then(function (response) {
                alert("Your query has been updated successfully");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    handleDescr(e) {
        this.setState({
            desc: e.target.value,
        })
    }

    handleNotes(e) {
        this.setState({
            notes: e.target.value,
        })
    }

    handleTypes(e) {
        this.setState({
            type: e.target.childNodes[0].nodeValue,
        });
    }

    handleHardware(e) {
        this.setState({
            hardware: e.target.childNodes[0].nodeValue,
        });
    }

    handleSoftware(e) {
        this.setState({
            software: e.target.childNodes[0].nodeValue,
        });
    }

    handleOS(e) {
        this.setState({
            OS: e.target.childNodes[0].nodeValue,
        });
    }

    handleOperator(e) {
        this.setState({
            operator_name: e.target.childNodes[0].nodeValue,
        });
    }

    handlePriority(e) {
        this.setState({
            priority: e.target.childNodes[0].nodeValue,
        });
    }

    handleStatus(e) {
        this.setState({
            status: e.target.childNodes[0].nodeValue,
        });
    }

    handleSpecialist(e) {
        this.setState({
            specialist: e.target.childNodes[0].nodeValue,
        });
    }

    render() {
        const {title, type, hardware, desc, notes, software, OS, reporter_name, operator_name, due, priority, specialist, status, disabled, types, hardwares, softwares, OSs, operators, specialists, priorities, statuses} = this.state;

        return (
            <div className="page expanded-query" id="add-query">
                <Nav />
                <Profile />
                <h1> Create a new query </h1>
                <div className="row">
                    <Input
                        placeholder='Title'
                        value={title}
                        disabled={disabled}
                        onChange={(e) => this.handleTitle(e)}
                    />
                </div>
                <div className="row">
                    <Dropdown
                        placeholder='Type'
                        selection
                        options={types}
                        value={type}
                        disabled={disabled}
                        onChange={(e) => this.handleTypes(e)}
                    />

                    <Dropdown
                        placeholder='Affected Hardware'
                        selection
                        options={hardwares}
                        value={hardware}
                        disabled={disabled}
                        onChange={(e) => this.handleHardware(e)}
                    />
                </div>

                <div className="row">
                    <Input
                        placeholder='Description'
                        value={desc}
                        disabled={disabled}
                        onChange={(e) => this.handleDescr(e)}
                    />
                    <Input
                        placeholder='Notes'
                        value={notes}
                        disabled={disabled}
                        onChange={(e) => this.handleNotes(e)}
                    />
                </div>

                <div className="row">
                    <Dropdown
                        placeholder='Software'
                        selection
                        options={softwares}
                        value={software}
                        disabled={disabled}
                        onChange={(e) => this.handleSoftware(e)}
                    />

                    <Dropdown
                        placeholder='OS'
                        selection
                        options={OSs}
                        value={OS}
                        disabled={disabled}
                        onChange={(e) => this.handleOS(e)} />
                </div>

                <div className="row bottom-section">
                    <div className="col-md-4">
                        <h2>Reporter</h2>
                        <hr/>
                        <Input placeholder='Full Name' value={reporter_name} disabled /> <br/>
                    </div>
                    <div className="col-md-4">
                        <h2>Operator</h2>
                        <hr/>

                        <Dropdown
                            placeholder='Full Name'
                            selection
                            options={operators}
                            value={operator_name}
                            disabled={disabled}
                            onChange={(e) => this.handleOperator(e)}
                        /> <br/>
                    </div>
                    <div className="col-md-4">
                        <h2>Due</h2>
                        <hr/>
                        <Input placeholder='Due Period (in days)' value={due} disabled />
                    </div>
                </div>

                <div className="right-section edit">
                    <Dropdown
                        placeholder='Priority'
                        selection
                        options={priorities}
                        value={priority}
                        disabled={disabled}
                        onChange={(e) => this.handlePriority(e)}
                        icon={<i className="fas fa-exclamation-triangle" />}
                    /> <br/>

                    <Dropdown
                        placeholder='Status'
                        selection
                        options={statuses}
                        value={status}
                        disabled={disabled}
                        onChange={(e) => this.handleStatus(e)}
                        icon={<i className="fas fa-chart-line" />}
                    /> <br/>

                    <Dropdown
                        placeholder='Specialist'
                        selection
                        options={specialists}
                        value={specialist}
                        disabled={disabled}
                        onChange={(e) => this.handleSpecialist(e)}
                        icon={<i className="fas fa-user" />}
                    /> <br/>
                </div>

                <div className="row buttons">
                    <div className="col-md-1 offset-md-8">
                        <input type="button" id="create-query-btn" value="Edit" onClick={() => this.editQuery()} />
                    </div>
                    <div className="col-md-1">
                        <input type="button" id="create-query-btn" value="Save" onClick={() => this.saveQuery()} />
                    </div>
                </div>
            </div>


        );
    }
}

export default AddQuery;
