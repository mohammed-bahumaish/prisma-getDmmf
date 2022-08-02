// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getDMMF } from "@prisma/internals";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const dmmf = await getDMMF({
      datamodel: req.body.schema,
    });
    res.status(200).send(dmmf.datamodel);
  } catch (error) {
    console.log({ error });
    res.status(500).send(error);
  }
}
