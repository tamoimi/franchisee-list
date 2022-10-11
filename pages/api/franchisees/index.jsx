import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출!");
    console.log(req.body);
    const {
      body: { name, category, registDate, scale, fee },
    } = req;

    console.log("백엔드 로그:", name, category, registDate, scale, fee);

    // const parsedDate = new Date(registDate);
    // console.log(parsedDate);

    const result = await client.franchisee.create({
      data: {
        name,
        category,
        registDate: registDate,
        scale,
        fee: parseFloat(fee),
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "GET") {
    console.log("get 호출!");

    const { currentPage, rowsPerPage } = req.query;
    console.log("currentPage, rowsPerPage", currentPage, rowsPerPage);

    const skipNumber = currentPage * 10;
    const take = +rowsPerPage;
    const result = await client.franchisee.findMany({ skip: skipNumber, take });
    const totalCount = await client.franchisee.count();

    res.status(200).json({ result: result, totalCount: totalCount });
  }

  if (req.method === "DELETE") {
    console.log("delete 호출!");
    const {
      body: { id },
    } = req;

    const result = await client.franchisee.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "PUT") {
    console.log("put 호출~!");
    const {
      body: {
        data: { id, name, category, registDate, scale, fee },
      },
    } = req;
    // 호출된 아이디를 확인하기 위함
    console.log("id", id);

    const result = await client.franchisee.update({
      data: {
        name,
        category,
        registDate,
        scale,
        fee: parseFloat(fee),
      },
      where: {
        id: +id,
      },
    });
    res.status(200).json(result);
  }
}
