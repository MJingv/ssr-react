import {Route} from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

export default (
	<div>
		<Route path='/login' exact component={Login}/>
		<Route path='/' exact component={Home}/>
	</div>
);
