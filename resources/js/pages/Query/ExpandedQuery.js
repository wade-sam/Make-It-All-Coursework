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
            status: ''
        }
    }

    componentWillMount() {
        // Get Hardware Items from API
        axios.get(`/api/query/${this.state.currentId}`).then(res => {
            console.log(res.data)

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
    }

    render() {
        const {title, type, hardware, desc, notes, software, OS, reporter_name, operator_name, due, priority, specialist, status} = this.state;

        return (
            <div className="page expanded-query" id="add-query">
                <Nav />
                <Profile />
                <h1> Create a new query </h1>
                <div className="row">
                    <Input placeholder='Title' value={title} disabled/>
                </div>
                <div className="row">
                    <Input placeholder='Type' value={type} disabled />
                    <Input placeholder='Affected Hardware' value={hardware} disabled />
                </div>
                <div className="row">
                    <Input placeholder='Description' value={desc} disabled />
                    <Input placeholder='Notes' value={notes} disabled />
                </div>
                <div className="row">
                    <Input placeholder='Software' value={software} disabled />
                    <Input placeholder='OS' value={OS} disabled />
                </div>
                <div className="row bottom-section">
                    <div className="col-md-4">
                        <h2>Reporter</h2>
                        <hr/>
                        <Input placeholder='Full Name' value={reporter_name} disabled /> <br/>
                        <Input placeholder='Tel' value="Add Tel" disabled /> <br/>
                        <Input placeholder='Email' value="Add Email" disabled />
                    </div>
                    <div className="col-md-4">
                        <h2>Operator</h2>
                        <hr/>
                        <Input placeholder='Full Name' value={operator_name} disabled /> <br/>
                        <Input placeholder='Tel' value="Add Tel" disabled /> <br/>
                        <Input placeholder='Email' value="Add Email" disabled />
                    </div>
                    <div className="col-md-4">
                        <h2>Due (in days)</h2>
                        <hr/>
                        <Input placeholder='Due Period (in days)' value={due} disabled />
                    </div>
                </div>

                <div className="right-section">
                    <p><i className="fas fa-exclamation-triangle" />{priority}</p> <br/>
                    {/*<Input placeholder='Priority' value={priority} disabled /> <br/>*/}
                    <p><i className="fas fa-chart-line" /> {status}</p> <br/>
                    <p><i className="fas fa-user" /> {specialist}</p> <br/>
                    {/*<Input placeholder='Assign to' value={specialist} disabled />*/}
                </div>

                <div className="row">
                    <input type="button" id="create-query-btn" value="Edit" onClick={console.log(123)} />
                </div>
            </div>


        );
    }
}

export default AddQuery;