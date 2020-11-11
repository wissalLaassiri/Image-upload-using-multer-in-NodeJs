const pool = require('../config/db');

const que_research_arti = `
SET 
    @ville_aricle= ?,
    @quartier_article =?,
    @id_theme =?,
    @id_sous_theme=?,
    @flag_magasin=?,
    @flag_livraison=?,
    @text1 = ?,
    @text2 = ?,
    @text3 = ?,
    @text4 = ?,
    @text5 = ?;

    SELECT a.titre_article,a.date_creation ,a.ville_article,m.lien_maps_magasin ,i.cle_image,i.extension_image FROM tab_theme t inner join tab_article_theme a_t on t.id_theme=a_t.id_theme inner join tab_article a on a.id_article=a_t.id_article inner join tab_article_magasin m on a.id_article=m.id_article inner join tab_image i on a.id_article=i.id_article WHERE a.ville_article = IFNULL(@ville_article,a.ville_article) 
        AND IFNULL(a.quartier_article,'') = IFNULL(@quartier_article,quartier_article)
        AND t.id_theme = IFNULL(@id_theme,t.id_theme)
        AND a_t.id_sous_theme = IFNULL(@id_sous_theme,a_t.id_sous_theme)
        AND m.flag_actif=IFNULL(@flag_mgasin,m.flag_actif)
        AND IFNULL(a.type_desservi,'')=IFNULL(@flag_livraison,a.type_desservi)
        AND (IFNULL(a.article_recherche,'') like CONCAT('%',IFNULL(@text1,a.article_recherche),'%') 
        AND IFNULL(a.article_recherche,'') like CONCAT('%',IFNULL(@text2,a.article_recherche),'%')
        AND IFNULL(a.article_recherche,'') like CONCAT('%',IFNULL(@text3,a.article_recherche),'%')
        AND IFNULL(a.article_recherche,'') like CONCAT('%',IFNULL(@text4,a.article_recherche),'%')
        AND IFNULL(a.article_recherche,'') like CONCAT('%',IFNULL(@text5,a.article_recherche),'%')) 
        ORDER BY a.date_creation desc
        ;   
`;
/*
        AND InStr(IFNULL(a.article_recherche,''),IFNULL(@text1,a.article_recherche)) >0
*/

module.exports = {
    searchArti: (data, callback) => {
        pool.query(
            que_research_arti,
            [
                data.ville_article,
                data.quartier_article,
                data.id_theme,
                data.id_sous_theme,
                data.flag_magasin,
                data.flag_livraison,
                data.text1,
                data.text2,
                data.text3,
                data.text4,
                data.text5
            ],
            (err, results, fields) => {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, results);
                }
            }
        );
    }
};