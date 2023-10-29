export class Requests {
	static async GET(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			return data;

		} catch (error) {
			throw new Error(`Error fetching user data: ${error.message}`);
		}
	};

}