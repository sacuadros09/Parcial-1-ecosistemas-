const app = require("./src/index");
const port = 3000;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
