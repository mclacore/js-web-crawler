import { test, expect } from '@jest/globals'
import { normalizeURL, getURLsFromHTML } from './crawl.js'

test('normalizes protocol', () => {
	const input = 'https://blog.boot.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test('normalizes www', () => {
	const input = 'https://www.blog.boot.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test('normalizes www and trailing slash', () => {
	const input = 'https://www.blog.boot.dev/path/'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test('normalizes trailing slash', () => {
	const input = 'https://blog.boot.dev/path/'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test('normalizes capitals', () => {
	const input = 'https://BLOG.boot.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test('normalizes protocol', () => {
	const input = 'http://blog.boot.dev/path'
	const actual = normalizeURL(input)
	const expected = 'blog.boot.dev/path'
	expect(actual).toEqual(expected)
})

test('fails for invalid URL', () => {
	const input = '/path'
	const actual = normalizeURL(input)
	expect(actual).toBeUndefined()
})

test('convert relative URL to absolute URL', () => {
	const htmlBody = `
<html>
	<body>
		<a href="/path">Boot blog path</a>
	</body>
</html>
`
	const baseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(htmlBody, baseURL)
	const expected = ['https://blog.boot.dev/path']
	expect(actual).toEqual(expected)
})

test('convert all relative URLs to absolute URLs', () => {
	const htmlBody = `
<html>
	<body>
		<a href="/path">Boot blog path</a>
		<a href="/foo">Foo path</a>
		<a href="/bar">Bar path</a>
	</body>
<
`
	const baseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(htmlBody, baseURL)
	const expected = [
		'https://blog.boot.dev/path',
		'https://blog.boot.dev/foo',
		'https://blog.boot.dev/bar'
	]
	expect(actual).toEqual(expected)
})

test('fetch absolute url from html', () => {
	const htmlBody = `
<html>
	<body>
		<a href="https://blog.boot.dev"</a>
	<body>
</html>
`
	const baseURL = 'https://blog.boot.dev'
	const actual = getURLsFromHTML(htmlBody, baseURL)
	const expected = ['https://blog.boot.dev']
	expect(actual).toEqual(expected)
})

// fetch absolute and relative from html
