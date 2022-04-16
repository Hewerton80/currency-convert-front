import { File } from '../types/Global'

const allowedExtensions = /(\jpg|\jpeg|\png)$/i

export const isValidFileSize = (file: File) => {
  return file?.size <= 1024 * 1024 * 2 // 2mb
}

export const isValidFormatSize = (file: File) => {
  return allowedExtensions.exec(file?.type?.split('/')?.[1])
}
