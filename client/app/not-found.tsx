import Container from '@/components/Container';
import Empty from '@/components/Empty';
import Base from '@/components/Layouts/Base';
import React from 'react';

const NotFoundPage = () => {
	return (
		<Base>
			<Container>
				<Empty
					title="404: Not Found"
					description="Ops...this page does not exist. Go back to the store and enjoy our offers."
					hasLink
				/>
			</Container>
		</Base>
	);
};

export default NotFoundPage;
