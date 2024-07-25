function printReport(pages) {
	console.log('Report is starting...')
	const sorted = reportSort(pages)
	for (const page in sorted) {
		console.log(`Found ${page[1]} internal links for ${page[0]}`)
	}
}

function reportSort(pages) {
	const pagesArray = Object.entries(pages)
	pagesArray.sort((key1, key2) => {
		if (key2[1] === key1[1]) {
			return key1[0].localeCompare(key2[0])
		}
		return key2[1] - key1[1]
	})

	return pagesArray
}

export { printReport, reportSort }
