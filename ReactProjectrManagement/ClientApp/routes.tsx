import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListUser } from './components/ListUser';
import { AddUser } from './components/AddUser';
import { AddProject } from './components/AddProject';
import { ListProject } from './components/ListProject';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/listuser' component={ListUser} />
    <Route path='/adduser' component={AddUser} />
    <Route path='/user/edit/:empid' component={AddUser} />
    <Route path='/listproject' component={ListProject} />
    <Route path='/addproject' component={AddProject} />
    <Route path='/project/edit/:projectid' component={AddProject} />
</Layout>;