db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    {
      role: "readWrite",
      db: "AUTH-SERVICE",
    },
  ],
});
