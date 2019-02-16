import React, {Component} from 'react';

import OSItem from './OSItem';
import axios from "axios";
import SoftwareItem from "./SoftwareItem";

class OSGroup extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            OSs: [],
        }
    }

    componentWillMount() {
        axios.get('/api/assets/os').then(res => {
            this.setState({
                OSs: res.data,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { OSs } = this.state;

        return (
            <div className="container card asset-card">
                <h1>OS</h1>

                {
                    OSs ? (
                        OSs.map((OS, i) => {
                            return (
                                <OSItem
                                    title={OS.os_name}
                                    key={i}
                                />
                            )
                        })
                    ) : null
                }
            </div>
        );
    }
}

export default OSGroup;