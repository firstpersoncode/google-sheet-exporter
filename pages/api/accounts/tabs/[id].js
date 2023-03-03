import tabs from "data/tabs.json";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send();
  res.status(200).json(tabs[req.query.id] || []);
}
