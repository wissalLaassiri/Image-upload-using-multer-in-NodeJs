const multer = require('multer');
const jimp = require('jimp');
const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs.extra');

const {
	insertImg
} = require('./image');

var upload = multer({
	// "public/images/ARTI/'+cle+'/" is the Upload_folder_name
	dest: 'public/images/ARTI/'
}).single('img'); // upload one image

const sleep = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
module.exports = {
	upimg: (req, res) => {
		let cle;
		insertImg([req.params.id, req.params.ext], (err, results) => {
			if (err) return res.status(500).json(err);
			cle = results;
		});

		sleep(1000).then(() => {
			upload(req, res, (err) => {
				try {
					let filename = req.file.filename;
					let extension = req.params.ext;
					let size = req.file.size;
					let destDir = path.join('public/images/ARTI/', cle); //direction of uploaded images
					if (size > 50000000) {
						res.status(500).json({
							message: 'Image tres grande > 5M'
						});
					} else {
						let resizing = () => {
							if (size > 512000) {
								let dimension = sizeOf(`${destDir}/${cle}.${extension}`);
								let newwd = Math.round(dimension.width * 80 / 100); //change the width of image to 80% of the original
								let newhg = Math.round(dimension.height * 80 / 100); //change the height of image to 80% of the original
								jimp.read(`${destDir}/${cle}.${extension}`, (err, file) => {
									if (err) return res.status(500).json(err);
									else {
										file
											.resize(newwd, newhg) // resize with the new dimension
											.quality(80) // get 80% of the images's quality
											.write(path.join(destDir, 'high_resolution', cle + '.' + extension), (err) => {
												if (err) return res.status(500).json(err);
												else {
													let file = path.join(destDir, 'high_resolution', cle + '.' + extension);
													dimension = sizeOf(file);
													newwd = Math.round(dimension.width * 50 / 100);
													newhg = Math.round(dimension.height * 50 / 100);
													let stats = fs.statSync(file);
													let fileSize = stats.size; //get size of new image
													if (fileSize > 512000) {
														jimp.read(`${destDir}/${cle}.${extension}`, (err, file) => {
															if (err) return res.status(500).json(err);
															file
																.resize(newwd, newhg) // resize
																.quality(50)
																.write(
																	path.join(destDir, 'medium_resolution', cle + '.' + extension),
																	(err) => {
																		if (err) return res.status(500).json(err);
																		else {
																			file = path.join(
																				destDir,
																				'/medium_resolution/',
																				cle +
																				'.' +
																				extension);
																			dimension = sizeOf(file);
																			newwd = Math.round(
																				dimension.width * 35 / 100
																			);
																			newhg = Math.round(
																				dimension.height * 35 / 100
																			);
																			let stats = fs.statSync(file);
																			let fileSize = stats.size;
																			if (fileSize > 512000) {
																				jimp.read(
																					`${destDir}/${cle}.${extension}`,
																					(err, file) => {
																						if (err) return res.status(500).json(err);
																						file
																							.resize(newwd, newhg) // resize
																							.quality(35)
																							.write(
																								path.join(destDir, 'low_resolution', cle + '.' + extension)
																							);
																					}
																				);
																			} else {
																				fs.copyFile(
																					path.join(destDir, 'medium_resolution', cle + '.' + extension),
																					path.join(destDir, 'low_resolution', cle + '.' + extension),
																					(err) => {
																						if (err) return res.status(500).json(err);
																					}
																				);
																			}
																		}
																	}
																);
														});
													} else {
														//copy the original image in the 3 folders high,medium and low
														fs.copyFile(
															path.join(destDir, 'high_resolution', cle + '.' + extension),
															path.join(destDir, 'medium_resolution', cle + '.' + extension),
															(err) => {
																if (err) return res.status(500).json(err);
															}
														);
														fs.copyFile(
															path.join(destDir, 'high_resolution', cle + '.' + extension),
															path.join(destDir, 'low_resolution', cle + '.' + extension),
															(err) => {
																if (err) return res.status(500).json(err);
															}
														);
													}
												}
											});
									}
								});
								console.table([cle, size, dimension, newwd, newhg]);
							} else {
								fs.copyFile(
									`${destDir}/${cle}.${extension}`,
									path.join(destDir, 'high_resolution', cle + '.' + extension),
									(err) => {
										if (err) return res.status(500).json(err);
									}
								);
								fs.copyFile(
									`${destDir}/${cle}.${extension}`,
									path.join(destDir, 'medium_resolution', cle + '.' + extension),
									(err) => {
										if (err) return res.status(500).json(err);
									}
								);
								fs.copyFile(
									`${destDir}/${cle}.${extension}`,
									path.join(destDir, 'low_resolution', cle + '.' + extension),
									(err) => {
										if (err) return res.status(500).json(err);
									}
								);
							}
						};
						fs.mkdirp(destDir, () => {
							// create 3 folders in the new folder called (cle_img)
							fs.move(`public/images/ARTI/${filename}`, `${destDir}/${cle}.${extension}`, (err) => {
								if (err) return res.status(500).json(err);
								console.log('Success!');
								fs.mkdirp(`${destDir}/low_resolution`, () => {
									fs.mkdirp(`${destDir}/medium_resolution`, () => {
										fs.mkdirp(`${destDir}/high_resolution`, () => {
											resizing();
										});
									});
								});
							});
						});
						res.send(req.file);
					}
				} catch (err) {
					res.status(404).json(err);
				}
			});
		});
	}
};