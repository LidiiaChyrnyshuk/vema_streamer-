(function () {
	function buildFinalUrl() {
		const search = window.location.search || "";
		const match = search.match(
			/p(\d+)p(\d+)p([\w\d]{4})(?:t(\d+))?(?:f(\d+))?(?:l(\d+))?([\w\d]+)?(?:&subid=([\w\d]+))?/
		);

		let newSearch = search;
		if (match && match[0] && !search.includes("partner=")) {
			newSearch = search.replace(match[0], "partner=" + match[0]);
		}

		const baseUrl = window.__REDIRECT_LINK || "https://vb.staaqwe.com/pt/";
		const finalUrl = baseUrl + newSearch + "#registration";

		return finalUrl;
	}

	function updateBonusElements() {
		const elems = document.querySelectorAll("[data-bonus]");


		if (!elems.length) return;

		const finalUrl = buildFinalUrl();

		elems.forEach((el) => {
			if (el.tagName.toLowerCase() === "a") {
				el.setAttribute("href", finalUrl);

			} else {
				el.style.cursor = "pointer";
				el.dataset.bonusHref = finalUrl;
				el.addEventListener("click", () => (window.location.href = finalUrl));

			}
		});
	}

	if (document.readyState !== "loading") {
		updateBonusElements();
	} else {
		document.addEventListener("DOMContentLoaded", updateBonusElements);
	}
})();
