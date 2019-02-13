import React, {Component} from 'react';
import { Input, Dropdown, Form, TextArea } from 'semantic-ui-react'

import Nav from '../../components/Nav';
import Profile from '../../components/Profile';

const queryData = [
    {
        titie: "Query1",
        id: 123,
        types: [
            { key: 'OS', text: 'OS', value: 'OS' },
            { key: 'hardware', text: 'Hardware', value: 'Hardware' },
            { key: 'software', text: 'Software', value: 'Software' },
        ],
        affectedHardware: [
            { key: '1', text: 'PC1', value: 'PC1' },
            { key: '2', text: 'PC2', value: 'PC2' },
            { key: '3', text: 'PC3', value: 'PC3' },
        ],
        descr: 'lorem ipsum dolor sit amet',
        notes: 'sdgjosifisjfoij dfsd',
        software: [
            { key: 'Word', text: 'OS', value: 'OS' },
            { key: 'hardware', text: 'Hardware', value: 'Hardware' },
            { key: 'software', text: 'Software', value: 'Software' },
        ],
        OS: [
            { key: '1', text: 'PC1', value: 'PC1' },
            { key: '2', text: 'PC2', value: 'PC2' },
            { key: '3', text: 'PC3', value: 'PC3' },
        ],
        similarQuery: 'fsdgf',
        reporter: {
            name: 'John Doe',
            tel: '1232453',
            email: 'john@gmail.com',
        },
        operator: {
            name: 'Bill Doe',
            tel: '1232453',
            email: 'bill@gmail.com',
        },
        duePeriod: 5,
    }
];

class AddQuery extends Component {
    render() {
        return (
            <div className="page" id="assets">
                <Nav />
                <Profile />
                <h1> Create a new query </h1>
                <div className="row">
                    <Input placeholder='Title' />
                    <Input placeholder='ID' />
                </div>
                <div className="row">
                    <Dropdown placeholder='Type' search selection options={queryData[0].types} />
                    <Dropdown placeholder='Affected Hardware' search selection options={queryData[0].affectedHardware} />
                </div>
                <div className="row">
                    <Form>
                        <TextArea placeholder='Description' />
                        <TextArea placeholder='Notes' />
                    </Form>
                </div>
                <div className="row">
                    <Dropdown placeholder='Software' search selection options={queryData[0].types} />
                    <Dropdown placeholder='OS' search selection options={queryData[0].affectedHardware} />
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <h2>Reporter</h2>
                        <hr/>
                        <Input placeholder='Full Name' /> <br/>
                        <Input placeholder='Tel' /> <br/>
                        <Input placeholder='Email' />
                    </div>
                    <div className="col-md-4">
                        <h2>Operator</h2>
                        <hr/>
                        <Input placeholder='Full Name' /> <br/>
                        <Input placeholder='Tel' /> <br/>
                        <Input placeholder='Email' />
                    </div>
                    <div className="col-md-4">
                        <h2>Due</h2>
                        <hr/>
                        <Input type="number" placeholder='Due Period (in days)' />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddQuery;