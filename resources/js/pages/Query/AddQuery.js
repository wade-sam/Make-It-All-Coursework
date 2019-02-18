import React, {Component} from 'react';
import { Input, Dropdown, Form, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';
import axios from "axios";


class AddQuery extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            queryData:
                {
                    title: "",
                    id: 0,
                    desc: "",
                    notes: "",
                    type: "",
                    hardware: "",
                    software: "",
                    OS: "",
                    caller: "",
                    operator: "",
                    specialist: "",
                    duePeriod: 0,
                }
            ,
            types: [
                { key: 'OS', text: 'OS', value: 'OS' },
                { key: 'hardware', text: 'Hardware', value: 'Hardware' },
                { key: 'software', text: 'Software', value: 'Software' },
            ],
            priorities: [
                { key: 'high', text: 'High', value: 'high' },
                { key: 'medium', text: 'Medium', value: 'medium' },
                { key: 'low', text: 'Low', value: 'low' },
            ],
            hardwares: [],
            softwares: [],
            OSs: [],
            reporters: {
                names: [],
                tels: [],
                emails: [],
            },
            operators: [],
            specialists: [],
        }
    }

    componentWillMount() {
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

    // Handle all the inputs and save them in state as the user is typing:

    handleTitle(event) {
        this.setState({
            queryData: {...this.state.queryData,
                title: event.target.value
            }
        });
    }

    handleDescr(event) {
        this.setState({
            queryData: {...this.state.queryData,
                desc: event.target.value
            }
        });
    }

    handleNotes(event) {
        this.setState({
            queryData: {...this.state.queryData,
                notes: event.target.value
            }
        });
    }

    handleTypes(event) {
        this.setState({
            queryData: {...this.state.queryData,
                type: event.target.childNodes[0].nodeValue
            }
        });
    }

    handlePriority(event) {
        this.setState({
            queryData: {...this.state.queryData,
                priority: event.target.childNodes[0].nodeValue
            }
        });
    }

    handleHardware(event) {
        this.setState({
            queryData: {...this.state.queryData,
                hardware: event.target.childNodes[0].nodeValue
            }
        });
    }

    handleSoftware(event) {
        this.setState({
            queryData: {...this.state.queryData,
                software: event.target.childNodes[0].nodeValue
            }
        });
    }

    handleOS(event) {
        this.setState({
            queryData: {...this.state.queryData,
                OS: event.target.childNodes[0].nodeValue
            }
        });
    }

    handleOperator(event) {
        this.setState({
            queryData: {...this.state.queryData,
                operator: event.target.childNodes[0].nodeValue
            }
        });
    }

    handleSpecialist(event) {
        this.setState({
            queryData: {...this.state.queryData,
                specialist: event.target.childNodes[0].nodeValue
            }
        });
    }

    handleDue(event) {
        this.setState({
            queryData: {...this.state.queryData,
                duePeriod: event.target.value
            }
        });
    }

    createQuery() {
        // Post request to add the new created query in the API
        axios.post('/api/query/store', {
            ...this.state.queryData
        })
            .then(function (response) {
                alert("Your query has been created successfully");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {queryData, types, hardwares, softwares, OSs, reporters, operators, specialists, priorities} = this.state;

        return (
            <div className="page" id="add-query">
                <Nav />
                <Profile />
                <h1> Create a new query </h1>
                <div className="row">
                    <Input placeholder='Title' onChange={(e) => this.handleTitle(e)} />
                </div>
                <div className="row">
                    <Dropdown placeholder='Type' selection options={types} onChange={(e) => this.handleTypes(e)} />
                    <Dropdown placeholder='System' selection options={hardwares} onChange={(e) => this.handleHardware(e)} />
                    <Dropdown placeholder='Affected Hardware' selection options={hardwares} onChange={(e) => this.handleHardware(e)} />
                </div>
                <div className="row">
                    <Form>
                        <TextArea placeholder='Description' onChange={(e) => this.handleDescr(e)} />
                        <TextArea placeholder='Notes' onChange={(e) => this.handleNotes(e)} />
                    </Form>
                </div>
                <div className="row">
                    <Dropdown placeholder='Software' selection options={softwares} onChange={(e) => this.handleSoftware(e)} />
                    <Dropdown placeholder='OS' selection options={OSs} onChange={(e) => this.handleOS(e)} />
                </div>
                <div className="row bottom-section">
                    <div className="col-md-4">
                        <h2>Reporter</h2>
                        <hr/>
                        <Dropdown placeholder='Full Name' selection options={types} /> <br/>
                        <Input placeholder='Tel' disabled /> <br/>
                        <Input placeholder='Email' disabled />
                    </div>
                    <div className="col-md-4">
                        <h2>Operator</h2>
                        <hr/>
                        <Dropdown placeholder='Full Name' selection options={operators} onChange={(e) => this.handleOperator(e)} /> <br/>
                        <Input placeholder='Tel' disabled /> <br/>
                        <Input placeholder='Email' disabled />
                    </div>
                    <div className="col-md-4">
                        <h2>Due (in days)</h2>
                        <hr/>
                        <Input type="number" placeholder='Due Period (in days)' min="1" onChange={(e) => this.handleDue(e)} />
                    </div>
                </div>

                <div className="right-section">
                    <Dropdown placeholder='Priority' selection options={priorities} onChange={(e) => this.handlePriority(e)} /> <br/>
                    <Dropdown placeholder='Assign to' selection options={specialists}  onChange={(e) => this.handleSpecialist(e)} /> <br/>
                </div>

                <div className="row">
                    <Link to={"/queries"}>
                        <input type="button" id="create-query-btn" value="Create Query" onClick={() => this.createQuery()} />
                    </Link>
                </div>
            </div>
        );
    }
}

export default AddQuery;
