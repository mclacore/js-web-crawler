import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	try {
		const normURL = new URL(url)
		const fullPath = normURL.hostname + normURL.pathname
		if (fullPath.startsWith('www.')) {
			return url.endsWith('/') ? fullPath.slice(4, -1) : fullPath.slice(4)
		}
		return url.endsWith('/') ? fullPath.slice(0, -1) : fullPath
	} catch (err) {
		console.log('Not a valid URL')
	}
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody)
	const elements = dom.window.document.querySelectorAll('a')
	const urls = []
	for (const element of elements) {
		if (element.href.startsWith('http')) {
			urls.push(element.href)
		} else {
			urls.push(baseURL + element + '/')
		}
	}
	return urls
}

async function crawlPage(url) {
	console.log(`Crawling ${url}`)

	let resp
	try {
		resp = await fetch(url)
	} catch (err) {
		throw new Error(`Error fetching URL: ${err.message}`)
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

	console.log(resp.text())
}

export { normalizeURL, getURLsFromHTML, crawlPage }
