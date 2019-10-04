import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface ListProjectDataState {
    userProject: ProjectData[];
    loading: boolean;
}

export class ListProject extends React.Component<RouteComponentProps<{}>, ListProjectDataState> {
    constructor() {
        super();
        this.state = { userProject: [], loading: true };

        fetch('api/Project/Index')
            .then(response => response.json() as Promise<ProjectData[]>)
            .then(data => {
                this.setState({ userProject: data, loading: false });
            });

       // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProjectTable(this.state.userProject);

        return <div>
            <h1>Project Data</h1>
            <p>This component demonstrates fetching Project data from the server.</p>
            <p>
                <Link to="/adduser">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an user
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete user with Id: " + id))
            return;
        else {
            fetch('api/Project/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        userProject: this.state.userProject.filter((rec) => {
                            return (rec.userId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/user/edit/" + id);
    }

    // Returns the HTML table to the render() method.
    private renderProjectTable(userProject: ProjectData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>ProjectId</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {userProject.map(emp =>
                    <tr key={emp.userId}>
                        <td></td>
                        <td>{emp.userId}</td>
                        <td>{emp.name}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.department}</td>
                        <td>{emp.city}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.userId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.userId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class ProjectData {
    userId: number = 0;
    name: string = "";
    gender: string = "";
    city: string = "";
    department: string = "";
} 