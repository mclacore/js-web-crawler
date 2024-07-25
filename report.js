function printReport(pages) {
	console.log('Report is starting...')
	const sorted = reportSort(pages)
	for (const page in sorted) {
		const url = page[0]
		const count = page[1]
		console.log(`Found ${count} internal links for ${url}`)
	}
}

function reportSort(pages) {
	const pagesArray = Object.entries(pages)
	pagesArray.sort((pageA, pageB) => {
		if (pageB[1] === pageA[1]) {
			return pageA[0].localeCompare(pageB[0])
		}
		return pageB[1] - pageA[1]
	})

	return pagesArray
}

export { printReport, reportSort }
