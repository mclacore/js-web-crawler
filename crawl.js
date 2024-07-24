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
	const result = []
	for (const element of elements) {
		result.push(baseURL + element)
	}
	return result
}

export { normalizeURL, getURLsFromHTML }
