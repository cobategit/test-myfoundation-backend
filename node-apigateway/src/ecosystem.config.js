module.exports = {
  apps: [
    {
      name: 'apigateway',
      script: './src/server.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: true,
      increment_var: 'PORT',
      max_memory_restart: '500M',
      exp_backoff_restart_delay: 100,
      env: {
        PORT: 3000,
        NODE_ENV: 'DEVELOPMENT',
      },
    },
  ],
}
