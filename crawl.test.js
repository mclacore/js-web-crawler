import { test, expect } from '@jest/globals'
import { normalizeURL } from './crawl.js'

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
