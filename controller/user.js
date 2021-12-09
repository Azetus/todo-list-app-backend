const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = (username, password) => {
  // escape 函数 预防 sql 注入攻击
  // 原理 转译
  username = escape(username);

  // 生成加密密码
  password = genPassword(password);
  password = escape(password);

  const sql = `
    select username, realname from users where username=${username} and password=${password}
  `;

  // console.log('sql:', sql);

  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
};

module.exports = {
  login
};