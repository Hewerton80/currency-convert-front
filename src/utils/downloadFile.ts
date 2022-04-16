export const downloadFile = (content: string, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([content]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}
