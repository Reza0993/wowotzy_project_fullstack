// controllers/StatsController.js
const db = require("../config/database"); // sesuaikan path jika berbeda

module.exports = {
  // GET /api/stats
  async index(req, res) {
    try {
      const conn = db.promise();

      // 1) Counts
      const [usersCountRows] = await conn.query(
        "SELECT COUNT(*) AS count FROM users",
      );
      const [filmsCountRows] = await conn.query(
        "SELECT COUNT(*) AS count FROM films",
      );
      const [commentsCountRows] = await conn.query(
        "SELECT COUNT(*) AS count FROM comments",
      );
      const [historyCountRows] = await conn.query(
        "SELECT COUNT(*) AS count FROM history",
      );

      const users = Number(usersCountRows[0].count);
      const films = Number(filmsCountRows[0].count);
      const comments = Number(commentsCountRows[0].count);
      const viewers = Number(historyCountRows[0].count);

      // 2) Total watch time (seconds)
      const [totalWatchRows] = await conn.query(
        "SELECT COALESCE(SUM(watch_time_seconds),0) AS total FROM history",
      );
      const totalWatchTimeSeconds = Number(totalWatchRows[0].total || 0);

      // 3) Growth data last 30 days (penonton per hari)
      const [growthRows] = await conn.query(
        `SELECT DATE(waktu_nonton) AS date, COUNT(*) AS viewers
         FROM history
         WHERE waktu_nonton >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
         GROUP BY DATE(waktu_nonton)
         ORDER BY DATE(waktu_nonton)`,
      );

      const growth = growthRows.map((r) => ({
        date: r.date,
        viewers: Number(r.viewers),
      }));

      return res.json({
        success: true,
        data: {
          users,
          films,
          comments,
          viewers,
          totalWatchTimeSeconds,
          growth,
        },
      });
    } catch (err) {
      console.error("StatsController.index error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // GET /api/activities
  async activities(req, res) {
    try {
      const conn = db.promise();

      const [recentUsers] = await conn.query(
        `SELECT id_user AS id, username AS title, created_at, 'new_user' AS type
         FROM users
         ORDER BY created_at DESC
         LIMIT 5`,
      );

      const [recentComments] = await conn.query(
        `SELECT c.id_comment AS id, c.komentar AS comment, c.tanggal AS created_at, u.username AS user, 'new_comment' AS type
         FROM comments c
         LEFT JOIN users u ON c.id_user = u.id_user
         ORDER BY c.tanggal DESC
         LIMIT 5`,
      );

      const [recentFilms] = await conn.query(
        `SELECT id_film AS id, judul AS title, created_at, 'new_film' AS type
         FROM films
         ORDER BY created_at DESC
         LIMIT 5`,
      );

      const activities = [];

      recentUsers.forEach((u) =>
        activities.push({
          type: u.type,
          id: u.id,
          name: u.title,
          created_at: u.created_at,
        }),
      );

      recentComments.forEach((c) =>
        activities.push({
          type: c.type,
          id: c.id,
          comment: c.comment,
          user: c.user,
          created_at: c.created_at,
        }),
      );

      recentFilms.forEach((f) =>
        activities.push({
          type: f.type,
          id: f.id,
          title: f.title,
          created_at: f.created_at,
        }),
      );

      activities.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      const limited = activities.slice(0, 20);

      return res.json({ success: true, data: limited });
    } catch (err) {
      console.error("StatsController.activities error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
