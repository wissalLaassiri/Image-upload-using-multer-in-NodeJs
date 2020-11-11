const multer = require('multer');
const pool = require('../config/db');
const path = require('path');
const fs = require('fs.extra');
const md5 = require('md5');



module.exports = {
    insertImg: ([id, ext], callBack) => {
        //const id = req.params.id;
        let extension = ext;
        let type = 'ARTI';
        let query = `INSERT INTO tab_image(cle_image, extension_image, type_image, id_article,ordre_image, flag_image_couverture) VALUES(null, null, null, null, null, null);`;
        pool.query(query, [], (err, results, fields) => {
            if (err) {
                return callback(err);
                //res.status(202).json(err);
            } else {
                let id_image = results.insertId;
                query = `UPDATE tab_image SET cle_image=?,extension_image=?,type_image=?,id_article=?,ordre_image=?,flag_image_couverture=? WHERE id_image = ?;Select cle_image FROM tab_image WHERE id_image =? `;
                pool.query(query, [`${id_image}${md5(id_image)}`, extension, type, id, 1, 'N', id_image, id_image], (err, results, fields) => {
                    if (err) console.log(err);
                    let cle = [...new Set(results[1].map(item => item.cle_image))];
                    let cle_image = '';
                    cle.forEach((cleim, i) => {
                        cle_image = cleim;
                    });
                    // console.log("cle : " + cle_image);
                    return callBack(null, cle_image);
                });
            }
        });
    }
}