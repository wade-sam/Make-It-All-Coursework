import React, {Component} from 'react';

import OSItem from './OSItem';
import axios from "axios";

class OSGroup extends Component {
    constructor (props) {
        super(props);

        this.state =  {
            OSs: [],
        }
    }

    componentWillMount() {
        // Geting the list of OS assets from the API and storing them in state
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
                    // Map through OS assets list and render each one of them in the OStem component
                    OSs ? (
                        OSs.map((OS, i) => {
                            return (
                                <OSItem
                                    title={OS.os_name}
                                    id={i}
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