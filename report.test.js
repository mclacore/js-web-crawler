import { test, expect } from '@jest/globals'
import { printReport } from './report.js'

test('print report', () => {
	const input = {
		url1: 1,
		url2: 2,
		url3: 3,
		url4: 5,
		url5: 4
	}
	const actual = printReport(input)
	const expected = [
		'url4: 5',
		'url5: 4',
		'url3: 3',
		'url2: 2',
		'url1: 1'
	]
	expect(actual).toEqual(expected)
})

test('print report null case', () => {
	const input = {}
	const actual = printReport(input)
	const expected = []
	expect(actual).toEqual(expected)
})
