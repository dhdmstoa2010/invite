import app from "./app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`모임초대 API listening on http://localhost:${PORT}`);
});
