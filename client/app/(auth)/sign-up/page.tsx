import React from 'react';
import Auth from '@/components/Layouts/Auth';
import FormSignUp from '@/components/FormSignUp';

const SignUp = () => {
	return (
		<Auth title="Sign Up">
			<FormSignUp />
		</Auth>
	);
};

export default SignUp;
