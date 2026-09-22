import './scroll-lock.js-DAwGTwcu.js';

//#region src/lib/global.svelte.ts
var bgGradient = `bg-linear-to-r from-background  to-secondary`;
var selectItem = `hover:bg-gray-100 hover:shadow-md hover:scale-101 duration-300 transition-all ease-in-out dark:hover:bg-gray-900`;
var dropdownClass = `flex capitalize flex-row gap-2 ${selectItem}`;
var formatEthiopianDate = (date) => {
	if (!date) return "";
	const dateObj = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}).format(dateObj);
};

export { bgGradient as b, dropdownClass as d, formatEthiopianDate as f, selectItem as s };
//# sourceMappingURL=global.svelte.js-B5dTSqD_.js.map
