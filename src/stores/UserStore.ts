export const loadUser = async (userID: string) => {
	const response = await fetch(`http://localhost:8080/user/get/${userID}`);

	if (response.ok) {
		const data = await response.json();
		console.log(data);
		return data;
	} else {
		console.log(response.status);
		throw new Error('Could not load user.');
	}
};
