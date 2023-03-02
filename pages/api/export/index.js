import exported from "data/exported.json";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();
  // handle export to google sheet
  res.status(200).json({ exported: Date.now() });
}
