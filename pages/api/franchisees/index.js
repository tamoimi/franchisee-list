import client from "../../libs/prismaClient,js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출!");

    const {
      body: {
        data: { name, category, registDate, scale, fee },
      },
    } = req;

    console.log("백엔드 로그:", name, category, registDate, scale, fee);

    const result = await client.franchisee.create({
      data: {
        name,
        category,
        registDate,
        scale,
        fee: parseFloat(fee),
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "GET") {
    console.log("get 호출!");

    const result = await client.franchisee.findMany({
      select: {
        id: true,
        category: true,
        scale: true,
        fee: true,
      },
    });
  }
}
