import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function User({ getUser, loading, user: { name } }) {
	const { login } = useParams();

	useEffect(() => {
		getUser(login);
	}, []);

	return <div>{name}</div>;
}

export default User;
