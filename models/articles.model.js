const db = require('../db/connection');

exports.fetchArticleById = async (article_id) => {
  const { rows } = await db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id]);
  const comments = await db.query('SELECT * FROM comments WHERE article_id = $1;', [article_id]);
  rows[0]['comment_count'] = comments.rows.length;
  return rows[0];
};
