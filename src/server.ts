import express from "express";
import routes from "./routes/reservaRoutes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log("ok");
});

app.use("/reservas", routes);

app.listen(3000, () => {
    console.log("servidor esta rodando em http://localhost:3000/");
});
