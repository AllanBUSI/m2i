module.exports = {
  name: "bots-bricks",
  script: 'src/index.ts',
  watch: true,
  autorestart: true,
  ignore_watch: ["node_modules", "logs", "screen"],
  // new feature; increase restart delay each time after every crash or non reachable db per example
  exp_backoff_restart_delay: 100,
  //combine multiple err/out logs in one file for each
  combine_logs: true,
  //calls combine logs
  merge_logs: true,
  //error log file path
  error_file: "logs/err.log", // better be /var/log
  //out log file path
  out_file: "logs/out.log",
  // use time in logs
  time: true,
  instances: 1,
  env_production: {
    NODE_ENV: "production"
  },
  env_development: {
    "PORT": 5000,
    "NODE_ENV": "development",
    "HOSTNAME": "localhost"
  },
  env: {
    "PORT": 5000,
    "NODE_ENV": "development",
    "HOSTNAME": "localhost",
    "COMPTE_EMAIL":"busi.travail@gmail.com",
    "COMPTE_PASSWORD":"Ligfy123!",
    "PORT":5000,
    "HOSTNAME":"localhost",
    "NOMBRE":230
  },
  watch_options: {
    usePolling: true // I've also tried persistent: true and followSymLinks: false here
  }
}