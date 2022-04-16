import { getCurrencyFormat } from './getCurrencyFormat'

export const onlyNumbersMask = (value: string) => {
  return value.replace(/\D/g, '')
}

export const applyPhoneMask = (phone: string) => {
  const phoneTrimmed = phone.trim()
  // 0000-0000
  if (phoneTrimmed.length === 8) {
    const part1 = phoneTrimmed.slice(0, 4)
    const part2 = phoneTrimmed.slice(4, 8)
    return `${part1}-${part2}`
  }
  // (00) 0000-0000
  else if (phoneTrimmed.length === 10) {
    const part1 = phoneTrimmed.slice(0, 2)
    const part2 = phoneTrimmed.slice(2, 6)
    const part3 = phoneTrimmed.slice(6, 10)
    return `(${part1}) ${part2}-${part3}`
  }
  //(00) 00000-0000
  else if (phoneTrimmed.length === 11) {
    const part1 = phoneTrimmed.slice(0, 2)
    const part2 = phoneTrimmed.slice(2, 7)
    const part3 = phoneTrimmed.slice(7, 11)
    return `(${part1}) ${part2}-${part3}`
  }
  //00 (00) 0000-0000
  else if (phoneTrimmed.length === 12) {
    const part1 = phoneTrimmed.slice(2, 4)
    const part2 = phoneTrimmed.slice(4, 8)
    const part3 = phoneTrimmed.slice(8, 12)
    return `(${part1}) ${part2}-${part3}`
  }
  //00 (00) 00000-0000
  else if (phoneTrimmed.length === 13) {
    const part1 = phoneTrimmed.slice(2, 4)
    const part2 = phoneTrimmed.slice(4, 9)
    const part3 = phoneTrimmed.slice(11, 13)
    return `(${part1}) ${part2}-${part3}`
  }
  return phoneTrimmed
}

export const addPhoneMask = (phone: string) => {
  let phoneTrimmed = phone.trim()
  phoneTrimmed = onlyNumbersMask(phoneTrimmed)
  phoneTrimmed = phoneTrimmed.replace(/(\d{2})(\d)/, '($1) $2')
  phoneTrimmed = phoneTrimmed.replace(/(\d{4})(\d)/, '$1-$2')
  return phoneTrimmed
}

export const addCepMask = (cep: string) => {
  let cepTrimmed = cep.trim()
  cepTrimmed = onlyNumbersMask(cepTrimmed)
  cepTrimmed = cepTrimmed.replace(/(\d{5})(\d)/, '$1-$2')

  return cepTrimmed
}

interface IAddMaskCpfConfig {
  hideCpf: boolean
}
export const addCpfMask = (cpf: string, config?: IAddMaskCpfConfig) => {
  let cpfTrimmed = cpf.trim()
  cpfTrimmed = onlyNumbersMask(cpfTrimmed)
  cpfTrimmed = cpfTrimmed.replace(/(\d{3})(\d)/, '$1.$2')
  cpfTrimmed = cpfTrimmed.replace(/(\d{3})(\d)/, '$1.$2')
  cpfTrimmed = cpfTrimmed.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  if (config?.hideCpf) {
    cpfTrimmed = `***.***.${cpfTrimmed.slice(8)}`
  }

  return cpfTrimmed
}

export const addCnpjMask = (cnpj: string) => {
  let cnpjTrimmed = cnpj.trim()
  cnpjTrimmed = onlyNumbersMask(cnpjTrimmed)
  cnpjTrimmed = cnpjTrimmed.replace(/(\d{2})(\d)/, '$1.$2')
  cnpjTrimmed = cnpjTrimmed.replace(/(\d{3})(\d)/, '$1.$2')
  cnpjTrimmed = cnpjTrimmed.replace(/(\d{3})(\d)/, '$1/$2')
  cnpjTrimmed = cnpjTrimmed.replace(/(\d{4})(\d)/, '$1-$2')

  return cnpjTrimmed
}

export const addTimeMask = (value: string) => {
  let timeMaskTrimmed = value.trim()
  timeMaskTrimmed = onlyNumbersMask(timeMaskTrimmed)
  timeMaskTrimmed = timeMaskTrimmed.replace(/^(\d{2})(\d)/, '$1:$2')
  timeMaskTrimmed = timeMaskTrimmed.replace(/^(\d{2})(\d)/, '$1:$2')
  timeMaskTrimmed = timeMaskTrimmed.substring(0, 5)
  return timeMaskTrimmed
}

export const addDateMask = (value: string) => {
  let dateMaskTrimmed = value.trim()
  dateMaskTrimmed = onlyNumbersMask(dateMaskTrimmed)
  dateMaskTrimmed = dateMaskTrimmed.replace(/(\d{2})(\d)/, '$1/$2')
  dateMaskTrimmed = dateMaskTrimmed.replace(/(\d{2})(\d)/, '$1/$2')
  return dateMaskTrimmed
}

export const addCurrencyMask = (value: string) => {
  return getCurrencyFormat(Number(onlyNumbersMask(value)) / 100)
}

export const addPercentMask = (value: string) => {
  let percentMaskTrimmed = value.trim()
  percentMaskTrimmed = onlyNumbersMask(percentMaskTrimmed)
  percentMaskTrimmed = percentMaskTrimmed.replace(/(\d{2})(\d)/, '$1,$2')
  percentMaskTrimmed = percentMaskTrimmed.replace(/(\d{2})(\d)/, '$1%')
  return percentMaskTrimmed
}

export const removeCurrencyMask = (currency: string) => {
  return Number(onlyNumbersMask(currency)) / 100
}
