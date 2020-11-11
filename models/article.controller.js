const {
	searchArti,
} = require("./article.model");


module.exports = {
	searchArticle: (req, res) => {
		const body = req.body;
		let start = Date.now();
		searchArti(body, (err, results) => {
			if (err) {
				res.send(err);
			} else {
				return res.json({
					message: "succes",
					Articles: results
				});
			}
		});
		console.log("it takes ", Date.now() - start, "ms");
	}
}