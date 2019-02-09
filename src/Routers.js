import {Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home';

export default (
	<div>
		<Route path='/' exact component={Home}/>
	</div>
);
