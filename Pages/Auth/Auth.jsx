import React, { useState, useContext } from "react";
import classes from "./signUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";

import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	// console.log(password, email);

	const [loading, setLoading] = useState({
		signIn: false,
		signUp: false,
	});

	const [{ user }, dispatch] = useContext(DataContext);
	// console.log(user);
	const navigate = useNavigate();
	const navStateData = useLocation();
	//   console.log(navStateData);

	const authHandler = async (e) => {
		e.preventDefault();
		// console.log(e.target.name);
		if (e.target.name == "signin") {
			setLoading({ ...loading, signIn: true });
			//firebase authentication
			signInWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					// console.log(userInfo);
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});

					setLoading({ ...loading, signIn: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((error) => {
					// console.log(error.message);
					setError(error.message);
					setLoading({ ...loading, signIn: false });
				});
		} else {
			setLoading({ ...loading, signUp: true });
			createUserWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					// console.log(userInfo);
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setLoading({ ...loading, signUp: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((error) => {
					// console.log(error);
					setError(error.message);
					setLoading({ ...loading, signUp: false });
				});
		}
	};

	return (
		<section className={classes.login}>
			{/* logo */}
			<Link to="/">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1020px-Amazon_logo.svg.png"
					alt="amazon logo"
				/>
			</Link>

			{/* form */}
			<div className={classes.login__container}>
				<h1> Sign In</h1>
				{navStateData?.state?.msg && (
					<small
						style={{
							padding: "5px",
							textAlign: "center",
							color: "red",
							fontWeight: "bold",
						}}
					>
						{navStateData?.state?.data}
					</small>
				)}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						type="submit"
						onClick={authHandler}
						name="signin"
						className={classes.login__signInButton}
					>
						{loading.signIn ? (
							<ClipLoader color="#36d7b7" size={15} />
						) : (
							" Sign In"
						)}
					</button>
				</form>
				{/* agreement */}

				<p>
					By signing in you agree to the AMAZON FAKE CLONE Conditions of use &
					Sale. Please see our Privacy Notice, our Cookies Notices and our
					Interest-Based Ads Notice{" "}
				</p>

				{/* Create account btn */}

				<button
					type="submit"
					onClick={authHandler}
					name="signup"
					className={classes.login__registereButton}
				>
					{loading.signUp ? (
						<ClipLoader color="#36d7b7" size={15} />
					) : (
						" Create your Amazon Account"
					)}
				</button>
				{error && (
					<small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</section>
	);
}

export default Auth;
