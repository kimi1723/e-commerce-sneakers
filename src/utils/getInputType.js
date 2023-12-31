const getInputType = key => {
	switch (key) {
		case 'email':
			return 'email';
		case 'tel':
			return 'tel';
		case 'zipCode':
			return 'number';
		case 'password':
			return 'password';
		default:
			return 'text';
	}
};

export default getInputType;
