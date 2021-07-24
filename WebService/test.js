const fs = require('fs');
const fetch = require('node-fetch');

const url = "https://external-content.duckduckgo.com/iu/?u=https%3A%F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.F84_B8nerSBGDqYhtAJKOQHaLH%26pid%3DApi&f=1"

const download = () => {
	fetch(url).then(res => {
		if (res.status === 200) {
			res.buffer().then(buffer => {
				fs.writeFile(`./image.jpg`, buffer, () =>
					console.log('finished downloading!')
				);
			});
		} else {
			console.log('Not downloaded!');
		}
	}).catch(err => {
		console.log(err);
	})
}

download();