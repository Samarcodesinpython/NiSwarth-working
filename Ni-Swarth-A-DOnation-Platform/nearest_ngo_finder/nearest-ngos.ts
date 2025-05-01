import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    res.status(400).json({ error: 'Missing lat or lon' })
    return
  }

  // Run the Python script as a subprocess
  const py = spawn('python', [
    '../../nearest_ngo_finder/find_nearest_ngos.py', // Adjust path if needed
    '--lat', String(lat),
    '--lon', String(lon)
  ])

  let output = ''
  py.stdout.on('data', (data) => {
    output += data.toString()
  })

  let error = ''
  py.stderr.on('data', (data) => {
    error += data.toString()
  })

  py.on('close', (code) => {
    if (code !== 0) {
      res.status(500).json({ error: error || 'Python script failed' })
      return
    }
    // Parse the output (assuming each NGO is printed on a new line)
    // Example: "Hope Foundation (2.30 km) - 123, Main Road, Connaught Place, New Delhi - 110001"
    const ngos = output
      .split('\n')
      .filter(line => line && !line.startsWith('Top 5'))
      .map(line => {
        const match = line.match(/^(.*?) \(([\d.]+) km\) - (.*)$/)
        if (!match) return null
        return {
          name: match[1],
          distance: parseFloat(match[2]),
          address: match[3]
        }
      })
      .filter(Boolean)
    res.status(200).json(ngos)
  })
}
