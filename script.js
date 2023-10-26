import {drawUserPosts} from "./postsDraw.js";
import {drawMenu} from "./menu.js";
import {Requests} from "./requests.js";
import {drawCreatePosts} from "./createDraw.js";
import {drawEditPosts} from "./editDraw.js";



Requests.GET("app.json")
	.then((data) => drawMenu(data));

const postsRequest = Requests.GET("https://jsonplaceholder.typicode.com/posts");
const usersRequest = Requests.GET("https://jsonplaceholder.typicode.com/users");


Promise.all([postsRequest, usersRequest])
	.then(([postsData, usersData]) => {
		drawUserPosts(postsData, usersData);
		return [postsData, usersData];
	})
	.then(([postsData, usersData]) => {
		const button = document.querySelector(".create-button");

		button.addEventListener("click", drawCreatePosts(usersData));

		return usersData;

	})
	.then((usersData) => {
		const edit = document.querySelectorAll(".editable");

		edit.forEach(elem => {
			elem.addEventListener("click", drawEditPosts(usersData)); // Use elem, not addEventListener
		});
	})
	.catch(err => {
		console.error("Something went wrong", err);
	});





