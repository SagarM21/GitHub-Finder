import axios from "axios";
import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //switch is changed by routes
import "./App.css";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Search from "./components/users/Search";
import User from "./components/users/User";
import Users from "./components/users/Users";
import GitHubState from "./context/github/GithubState";

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ users: res.data, loading: false });
	// }

	//Get single Github user
	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		setUser(res.data);
		setLoading(false);
	};

	//Get users repo
	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		setRepos(res.data);
		setLoading(false);
	};

	//clear user from state
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 4000);
	};

	return (
		<GitHubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Routes>
							<Route
								exact
								path='/'
								element={
									<Fragment>
										<Search
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								}
							/>
							<Route exact path='/about' element={<About />} />
							<Route
								path={"/user/:login"}
								element={
									<User
										getUser={getUser}
										user={user}
										loading={loading}
										getUserRepos={getUserRepos}
										repos={repos}
									/>
								}
							/>
						</Routes>
					</div>
				</div>
			</Router>
		</GitHubState>
	);
};

export default App;
