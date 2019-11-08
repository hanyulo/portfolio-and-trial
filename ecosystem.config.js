module.exports = {
  apps: [
    {
      name: 'portfolio-and-trial',
      script: './server.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
