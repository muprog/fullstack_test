import { Request, Response } from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import { createObjectCsvWriter } from 'csv-writer'
import csv from 'csv-parser'
const upload = multer({ dest: 'temp/' })
export const uploadMiddleware = upload.single('file')

export const test = (req: Request, res: Response) => {
  res.json({ message: 'hello world' })
}

export const handleUpload = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

  const tempPath = req.file.path
  const outputFileName = `result-${uuidv4()}.csv`
  const outputPath = path.join(__dirname, '../../uploads', outputFileName)

  const salesMap = new Map<string, number>()

  try {
    fs.createReadStream(tempPath)
      .pipe(csv())
      .on('data', (row: { [key: string]: string }) => {
        const dept = row['Department Name']
        const sales = parseInt(row['Number of Sales'], 10)

        if (!isNaN(sales)) {
          const current = salesMap.get(dept) || 0
          salesMap.set(dept, current + sales)
        }
      })
      .on('end', async () => {
        const csvWriter = createObjectCsvWriter({
          path: outputPath,
          header: [
            { id: 'department', title: 'Department Name' },
            { id: 'totalSales', title: 'Total Number of Sales' },
          ],
        })

        const records = Array.from(salesMap.entries()).map(
          ([department, totalSales]) => ({
            department,
            totalSales,
          })
        )

        await csvWriter.writeRecords(records)

        fs.unlinkSync(tempPath)

        return res.status(200).json({
          message: 'File processed successfully',
          downloadurl: `${
            process.env.CLIENT_URl || 'https://fullstack-test-opal.vercel.app/'
          }/files/${outputFileName}`,
        })
      })
      .on('error', (err) => {
        console.error(err)
        return res.status(500).json({ error: 'Failed to process CSV file' })
      })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Unexpected server error' })
  }
}
