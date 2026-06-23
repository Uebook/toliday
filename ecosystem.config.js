module.exports = {
  apps: [
    {
      name: "toliday-backend",
      cwd: "./backend",
      script: "npm",
      args: "run start:prod",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    },
    {
      name: "toliday-frontend",
      cwd: "./frontend",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
