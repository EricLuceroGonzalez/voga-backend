const { app, port } = require("./server");

require("./database");

app.listen(port, () => {
  console.log(
  `Server running on port ${port}`);
});
