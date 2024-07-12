const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

const Classes = sequelize.define("Classes", {
  title: {
    type: Sequelize.STRING,
    allowNull: true 
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: true 
  },
  question: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imgUrls: {
    type: Sequelize.STRING,
    allowNull: true
  },
  fileUrls: {
    type: Sequelize.STRING,
    allowNull: true
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

const Reserve = sequelize.define("Reserve", {
  title: {
    type: Sequelize.STRING,
    allowNull: true 
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: true 
  },
  userId: {
    type: Sequelize.NUMBER,
    allowNull: true 
  }
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  Classes,
  Reserve
};
