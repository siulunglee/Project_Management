import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { ProjectData } from './ListProject';

interface AddProjectDataState {
    title: string;
    loading: boolean;
    cityList: Array<any>;
    empData: ProjectData;
}

export class AddProject extends React.Component<RouteComponentProps<{}>, AddProjectDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cityList: [], empData: new ProjectData };

        fetch('api/Project/GetCityList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cityList: data });
            });

        var projectid = this.props.match.params["projectid"];

        // This will set state for Edit user
        if (projectid > 0) {
            fetch('api/Project/Details/' + projectid)
                .then(response => response.json() as Promise<ProjectData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }

        // This will set state for Add user
        else {
            this.state = { title: "Create", loading: false, cityList: [], empData: new ProjectData };
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

        // PUT request for Edit user.
        if (this.state.empData.userId) {
            fetch('api/Project/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/listuser");
                })
        }

        // POST request for Add user.
        else {
            fetch('api/Project/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/listuser");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/listuser");
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm(cityList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="userId" value={this.state.empData.userId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>
                            <option value="">-- Select City --</option>
                            {cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}