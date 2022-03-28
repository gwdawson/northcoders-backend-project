const db = require('../db/connection');

exports.getArticleById = async (article_id) => {
  const { rows } = await db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id]);
  return rows[0];
};
