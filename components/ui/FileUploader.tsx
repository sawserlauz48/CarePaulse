"use clinet"
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files:File[])=> void,
}

export const  FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(acceptedFiles : File[] => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader