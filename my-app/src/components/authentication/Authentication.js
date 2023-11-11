import { useState } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useValidation from '../../hooks/useValidation';

import classes from './Authentication.module.css';

const Authentication = ({ isSignIn }) => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});
	const [isTouched, setIsTouched] = useState({
		email: false,
		password: false,
	});

	console.log('re');

	const navigation = useNavigation();

	const isSubmitting = navigation.state === 'submitting';

	useValidation(emailValue, 'email', isTouched.email, setErrors);
	useValidation(passwordValue, 'password', isTouched.password, setErrors);

	const emailHandler = e => {
			setEmailValue(e.target.value);
			isTouchedEmailHandler();
		},
		passwordHandler = e => {
			setPasswordValue(e.target.value);
			isTouchedPasswordHandler();
		};

	const isTouchedEmailHandler = () => {
			setIsTouched(prev => {
				return { ...prev, email: true };
			});
		},
		isTouchedPasswordHandler = () => {
			setIsTouched(prev => {
				return { ...prev, password: true };
			});
		};

	return (
		<main className={classes.main}>
			<Form method="post" className={classes.form}>
				<h1>{isSignIn ? 'Sign in' : 'Create new account'}</h1>
				<p className={classes['input-container']}>
					{errors.email && isTouched.email && <span className={classes.error}>Please enter a valid email!</span>}
					<label htmlFor="email" className={classes.label}>
						Email
					</label>
					<input
						id="email"
						type="email"
						name="email"
						className={classes.input}
						onChange={emailHandler}
						onBlur={isTouchedEmailHandler}
					/>
				</p>
				<p className={classes['input-container']}>
					{errors.password && isTouched.password && (
						<span className={classes.error}>Your password should be at least 8 characters long!</span>
					)}
					<label htmlFor="password" className={classes.label}>
						Password
					</label>
					<input
						id="password"
						type="password"
						name="password"
						className={classes.input}
						onChange={passwordHandler}
						onBlur={isTouchedPasswordHandler}
					/>
				</p>
				<div className={classes.actions}>
					<p className={classes['change-mode']}>
						{isSignIn ? `You don't have an account yet?` : 'Already a member?'}
						<Link to={`?mode=${isSignIn ? 'signup' : 'signin'}`} className={classes.link}>
							{isSignIn ? 'Create new one' : 'Sign in'}
						</Link>
					</p>

					<motion.button
						type="submit"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 1.1 }}
						whileFocus={{ scale: 1.05 }}
						transition={{ type: 'spring', stiffness: 500 }}
						disabled={errors.email && errors.password}
						className={classes.btn}>
						{isSubmitting ? 'Submiting...' : isSignIn ? 'Sign in' : 'Sign up'}
					</motion.button>
				</div>
			</Form>
		</main>
	);
};

export default Authentication;
