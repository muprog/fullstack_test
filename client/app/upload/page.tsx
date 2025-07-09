'use client'
import React, { useState } from 'react'
import axios from '../../util/axios'

export default function upload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUpLoading] = useState(false)
  const [downloadurl, setDownloadUrl] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }
  const handleUpdload = async () => {
    if (!file) return alert('Please select the csv file')
    const formData = new FormData()
    formData.append('file', file)
    try {
      setUpLoading(true)
      const res = await axios.post('/upload', formData)
      setDownloadUrl(res.data.downloadurl)
    } catch (error) {
      console.log(error)
      alert('Something went wrong')
    } finally {
      setUpLoading(false)
    }
  }
  return (
    <div className='pt-10 flex justify-center'>
      <div className='boxes'>
        <div>
          <input type='file' accept='.csv' onChange={handleChange} />
        </div>
        <div>
          <button
            className='border px-2 rounded-full upload'
            onClick={handleUpdload}
            disabled={uploading}
          >
            {uploading ? 'uploading' : 'upload'}
          </button>
        </div>
        {downloadurl && (
          <div>
            File processed!{' '}
            <a href={downloadurl} download>
              Download csv
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
