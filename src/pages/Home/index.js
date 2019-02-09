import React from 'react';
import Header from './../../components/Header';

const Home = () => (
	<div>
		<Header/>
		welcome to home
		<button onClick={() => {
			console.log(222);
		}}>click</button>
	</div>
);

export default Home;

