import React from 'react';
import Header from './../../components/Header';
import style from './style.css';

const Home = () => (
	<div className={style.test}>
		<Header/>
		welcome to home
		<button onClick={() => {
			console.log(222);
		}}>click</button>
	</div>
);

export default Home;

