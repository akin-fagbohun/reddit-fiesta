const db = require('../db/connection');

exports.addComment = (comment, article_id) => {
  const { username, body } = comment;
  const { article_id: id } = article_id;
  return db
    .query(
      `
  INSERT INTO comments (author, body, article_id, votes, created_at)
  VALUES ($1, $2, $3, 0, NOW())
  RETURNING *;`,
      [username, body, id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.removeComment = (id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1;', [id])
    .then((result) => {
      return result.rows;
    });
};
