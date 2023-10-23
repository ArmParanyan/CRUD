const navBar = document.getElementById("nav-bar");

fetch("app.json")
	.then(response => response.json())
	.then(data => {
		drawMenu(data);
	})
	.catch(error => {
		console.error("Error fetching JSON", error);
	});

function drawMenu(data) {
	const ul = document.createElement("ul");

	data.forEach(group => {
		const groupLi = document.createElement("li");
		groupLi.textContent = group.group;

		const pageUl = document.createElement("ul");

		group.pages.forEach(page => {
			if (page.children.length > 0) {
				const pageLi = document.createElement("li");


				//image porc TODO
				const image = document.createElement('img');
				image.src = "./images/Beared%20Guy02-min%201.png";
				pageLi.textContent = page.title;


				const childrenUl = document.createElement("ul");

				page.children.forEach(child => {
					const childLi = document.createElement("li");
					childLi.textContent = child.title;
					childrenUl.appendChild(childLi);
				});

				pageLi.appendChild(childrenUl);
				pageLi.appendChild(image)
				pageUl.appendChild(pageLi);
			}
		});

		if (pageUl.childNodes.length > 0) {
			groupLi.appendChild(pageUl);
			ul.appendChild(groupLi);
		}

	});
	navBar.appendChild(ul);
}