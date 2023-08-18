import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body
    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      { image_url: url },
      { headers: { 'X-Api-Key': process.env.REMOVEBG_API_KEY }, responseType: 'arraybuffer' }
    )
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Content-Disposition', 'attachment; filename=output.png')
    res.send(response.data)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
