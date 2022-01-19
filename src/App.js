import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //switch is changed by routes
import "./App.css";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import User from "./components/users/User";
import AlertState from "./context/alert/AlertState";
import GitHubState from "./context/github/GithubState";

const App = () => {
	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ users: res.data, loading: false });
	// }

	return (
		<GitHubState>
			<AlertState>
				<Router>
					<div className='App'>
						<Navbar />
						<div className='container'>
							<Alert />
							<Routes>
								<Route exact path='/' element={<Home />} />
								<Route exact path='/about' element={<About />} />
								<Route path={"/user/:login"} element={<User />} />
								<Route path='*' element={<NotFound />} />
							</Routes>
						</div>
					</div>
				</Router>
			</AlertState>
		</GitHubState>
	);
};

export default App;
