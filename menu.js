const navBar = document.getElementById("nav-bar");



export function drawMenu(data) {
	const ul = document.createElement("ul");

	data.forEach(item => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		li.innerHTML = item.group;
		// a.classList.add("decoration")


		// li.appendChild(a);
		ul.appendChild(li);

		// const arrayProperties = Object.keys(item).filter(prop => Array.isArray(item[prop]));

		// console.log(arrayProperties);

		// console.log(CHILDREN);

		item.pages.forEach(elem => {
			const pagesLi = document.createElement("li");
			const pagesA = document.createElement("a");
			const pagesUl = document.createElement("ul");
			const icon = document.createElement("img");
			const arrowIcon = document.createElement("img");

			pagesA.classList.add("decoration");

			pagesA.innerHTML = elem.title;
			// console.log(elem.title);
			pagesA.href = elem.path;
			icon.src = elem.icon;

			pagesLi.appendChild(icon);
			pagesLi.appendChild(pagesA);


			pagesUl.appendChild(pagesLi);


			if (elem.children && elem.children.length > 0) {
				arrowIcon.src = "./images/ic_Chevron.svg";
				arrowIcon.style.transform = "rotate(90deg)";

				pagesLi.appendChild(arrowIcon);

				// drawMenu(elem.children);

				// console.log(elem.children)

				// elem.children.forEach(child => {
				// 	console.log("       ",child.title);
				// });

			}


			ul.appendChild(pagesUl);


		});


		// drawMenu(item, navBar);


	});

	navBar.appendChild(ul);


}


// const navBar = document.getElementById("nav-bar");
//
// fetch("app.json")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		drawMenu(data);
// 	})
// 	.catch((error) => {
// 		console.error("Error fetching JSON", error);
// 	});
//
// function drawMenu(data) {
// 	const ul = document.createElement("ul");
//
// 	data.forEach((item) => {
// 		const li = document.createElement("li");
// 		const a = document.createElement("a");
// 		li.innerHTML = item.group;
//
//
// 		li.appendChild(a);
// 		ul.appendChild(li);
// 		// li.style.borderTop = "1px solid #E9ECEF";
//
// 		for (const prop in item) {
// 			if (Array.isArray(item[prop])) {
// 				item[prop].forEach((elem) => {
// 					const pagesLi = document.createElement("li");
// 					const pagesA = document.createElement("a");
// 					const pagesUl = document.createElement("ul");
// 					const icon = document.createElement("img");
// 					const arrowIcon = document.createElement("img");
//
// 					pagesA.classList.add("decoration");
// 					pagesA.innerHTML = elem.title;
// 					pagesA.href = elem.path;
// 					icon.src = elem.icon;
//
// 					pagesLi.appendChild(icon);
// 					pagesLi.appendChild(pagesA);
// 					pagesUl.appendChild(pagesLi);
//
// 					if (elem.children && elem.children.length > 0) {
// 						arrowIcon.src = "./images/ic_Chevron.svg";
// 						arrowIcon.style.transform = "rotate(90deg)";
// 						pagesLi.appendChild(arrowIcon);
// 						// elem.children.forEach((child) => {
// 						// 	console.log(child.title);
// 						// });
//
// 						// drawMenu(elem.children);
// 					}
//
// 					ul.appendChild(pagesUl);
// 				});
// 			}
// 		}
// 	});
//
// 	navBar.appendChild(ul);
// }

// console.log(navBar.offsetHeight);
