// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Result = {};

const mapMethodToController: Record<string, NextApiHandler> = {
  GET: async (req, res) => {
    const search = (req.query.s as string) ?? '';
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=' + req.query.offset + '&limit=' + (search ? '100' : '20');

    try {
      const resp = await axios<{
        results: {
          name: string;
          url: string;
        }[];
      }>(url);

      const data = resp.data;
      const results: Result[] = [];

      for (const result of data.results) {
        try {
          const resp = await axios.get(result.url);
          if (result.name.toLowerCase().includes(search.toLowerCase()) || ('' + resp.data?.id).includes(search)) {
            results.push({ name: result.name, ...resp.data });
          }
        } catch (error) {}
      }

      res.json({ ...data, results });
    } catch (error) {
      console.log(error);
      res.status(404).json({});
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (mapMethodToController[req.method!]) {
    const controller = mapMethodToController[req.method!];
    return controller(req, res);
  }
  res.status(501).json({ message: 'Method is not implemented' });
}
