import React from 'react';
import Auth from '@/components/Layouts/Auth';
import FormSignIn from '@/components/FormSignIn';

const SignIn = () => {
	return (
		<Auth title="Sign In">
			<FormSignIn />
		</Auth>
	);
};

export default SignIn;
