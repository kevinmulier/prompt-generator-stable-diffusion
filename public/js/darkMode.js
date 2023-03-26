function toggleTheme() {
	const html = document.documentElement;
	const currentTheme = localStorage.getItem("theme");
	if (currentTheme === "dark") {
		localStorage.setItem("theme", "light");
		html.classList.remove("dark");
	} else {
		localStorage.setItem("theme", "dark");
		html.classList.add("dark");
	}
}

export default toggleTheme;
