import React, {Fragment} from 'react';
import Header from './../../components/Header';
// import style from './style.css';
import {Helmet} from 'react-helmet';

const Home = () => (
	<Fragment>
		<Helmet>
			<title>this is a home page</title>
		</Helmet>
		<div>
			<Header/>
			welcome to home
			<button onClick={() => {
				console.log(222);
			}}>click</button>
		</div>
	</Fragment>

);

export default Home;

