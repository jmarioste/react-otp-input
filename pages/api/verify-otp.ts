// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const code = req.body.code;
    console.log(req.body, req.body.code);
    if (code === "123456") {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "invalid code" });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
  res.end();
}
