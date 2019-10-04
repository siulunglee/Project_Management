import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProjectData } from './ListProject';

interface AddProjectDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    projectData: ProjectData;
}

export class AddProject extends React.Component<RouteComponentProps<{}>, AddProjectDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList: [], projectData: new ProjectData };

        fetch('api/Project/GetCityList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cityList: data });
            });

        var projectid = this.props.match.params["projectid"];

        // This will set state for Edit project
        if (projectid > 0) {
            fetch('api/Project/Details/' + projectid)
                .then(response => response.json() as Promise<ProjectData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, projectData: data });
                });
        }

        // This will set state for Add project
        else {
            this.state = { title: "Create", loading: false, cityList: [], projectData: new ProjectData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Project</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit project.
        if (this.state.projectData.projectId) {
            fetch('api/Project/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/listproject");
                })
        }

        // POST request for Add project.
        else {
            fetch('api/Project/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/listproject");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/listproject");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="projectId" value={this.state.projectData.projectId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.projectData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Description">Description</label>
                    <div className="col-md-4">
                        <div className="col-md-4">
                            <input className="form-control" type="text" name="name" defaultValue={this.state.projectData.description} required />
                        </div>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Template_ID" >templateID</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.projectData.templateID} required />
                    </div>
                </div>
                
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}