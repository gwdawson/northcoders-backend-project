const db = require('../db/connection');

exports.fetchArticleById = async (article_id) => {
  const { rows } = await db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id]);
  const comments = await db.query('SELECT * FROM comments WHERE article_id = $1;', [article_id]);
  rows[0]['comment_count'] = comments.rows.length;
  return rows[0];
};

exports.updateArticleById = async (article_id, inc_votes) => {
  const { rows } = await db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *', [
    inc_votes,
    article_id,
  ]);
  return rows[0];
};

exports.fetchArticles = async () => {
  const { rows } = await db.query(`
  SELECT articles.*, COUNT(comments.comment_id) AS comment_count
  FROM articles LEFT JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY articles.article_id
  ORDER BY articles.created_at DESC;`);
  return rows;
};

exports.insertCommentByArticleId = async (article_id, username, body) => {
  const { rows } = await db.query(
    'INSERT INTO comments (body, article_id, author, votes, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [body, article_id, username, 0, new Date()]
  );
  return rows[0];
};

exports.fetchCommentsByArticleId = async (article_id) => {
  const { rows } = await db.query(
    'SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;',
    [article_id]
  );
  return rows;
};
