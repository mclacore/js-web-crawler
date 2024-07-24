function normalizeURL(url) {
	try {
		const array = url.split('/')
		if (url.startsWith('http')) {
			return array[2] + '/' + array[3]
		} else {
			return array[0] + '/' + array[1]
		}
	} catch (err) {
		console.log('Not a valid URL')
	}
}

let url = 'https://blog.boot.dev/path/'
console.log(normalizeURL(url))
