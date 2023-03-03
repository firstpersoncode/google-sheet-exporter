import exported from "data/exported.json";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send();
  const data = exported.find((e) => e.id === req.query.id);
  if (data) res.status(200).json(data);
  else res.status(404).json({ message: "data not found" });
}
