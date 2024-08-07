import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	const urlObj = new URL(url)
	let fullPath = urlObj.hostname + urlObj.pathname
	if (fullPath.slice(-1) === '/') {
		fullPath = fullPath.slice(0, -1)
	}
	return fullPath
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody)
	const elements = dom.window.document.querySelectorAll('a')
	const urls = []
	for (const element of elements) {
		if (element.hasAttribute('href')) {
			let href = element.getAttribute('href')

			try {
				href = new URL(href, baseURL).href
				urls.push(href)
			} catch (err) {
				console.log(err.message)
			}
		}
	}
	return urls
}

async function fetchParse(url) {
	let resp
	try {
		resp = await fetch(url)
	} catch (err) {
		console.log(`Error fetching URL: ${err}`)
	}

	if (resp.status >= 400) {
		console.log(`HTTP response: ${resp.status} ${resp.statusText}`)
		return
	}

	const contentType = resp.headers.get('content-type')
	if (!contentType || !contentType.includes('text/html')) {
		console.log(`Error content-type: ${contentType}`)
		return
	}

	return resp.text()
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {

	const current = new URL(currentURL)
	const base = new URL(baseURL)

	if (current.hostname !== base.hostname) {
		return pages
	}

	const normURL = normalizeURL(currentURL)
	if (pages[normURL] > 0) {
		pages[normURL]++
		return pages
	}

	pages[normURL] = 1

	console.log(`Crawling ${currentURL}`)

	let html
	try {
		html = await fetchParse(currentURL)
	} catch (err) {
		console.log(err.message)
		return pages
	}

	const nextURLs = getURLsFromHTML(html, baseURL)
	for (const nextURL of nextURLs) {
		pages = await crawlPage(baseURL, nextURL, pages)
	}

	return pages
}

export { normalizeURL, getURLsFromHTML, crawlPage }
