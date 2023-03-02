import sheets from "data/sheets.json";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send();
  res.status(200).json(sheets[req.query.id]);
}
