export const loadContact = async (contactID: string) => {
	const response = await fetch(`http://localhost:8080/user/get/${contactID}`);

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		throw new Error('Could not load contact.');
	}
};
