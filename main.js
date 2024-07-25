import { argv } from 'node:process'
import { crawlPage } from './crawl.js'

async function main() {
	if (argv.length < 3) {
		console.log('No arguments given.')
		return
	}

	if (argv.length > 3) {
		console.log('Too many arguments given.')
		return
	}

	const baseURL = argv[2]

	console.log(`Booting up crawl of ${baseURL}`)

	const pages = await crawlPage(baseURL)

	console.log(pages)
}

main()
