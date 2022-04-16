import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import Alert from '../components/ui/feedback/Alert'
import Button from '../components/ui/forms/Button'
import FormGroup from '../components/ui/forms/FormGroup'
import FormLabel from '../components/ui/forms/FormLabel'
import InputTextCurrency from '../components/ui/forms/InputCurrency'
import SelectBox, { ISelectBoxOptions } from '../components/ui/forms/SelectBox'
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/layout/Card'
import { apiBase } from '../services/apiBase'
import { StateStatusEnum } from '../types/Global'
import { currenciesOptions } from '../utils/currenciesOptions'
import { getCurrencyFormat } from '../utils/getCurrencyFormat'
import { addCurrencyMask, removeCurrencyMask } from '../utils/mask'

const Home: NextPage = () => {
  const [lastAmoutInput, setLastAmoutInput] = useState('')
  const [amoutInput, setAmoutInput] = useState('R$ 1,00')
  const [fromCurrency, setFromCurrency] = useState<ISelectBoxOptions>({
    text: 'Real brasileiro',
    value: 'BRL',
  })
  const [toCurrency, setToCurrency] = useState<ISelectBoxOptions>({
    text: 'Dólar dos EUA',
    value: 'USD',
  })
  const selelectBoxOptions = useMemo<ISelectBoxOptions[]>(() => {
    return currenciesOptions.map((opt) => ({
      text: `${opt.code} - ${opt.name}`,
      value: opt.code,
    }))
  }, [])

  const [lastFromCurrency, setLastFromToCurrency] = useState<ISelectBoxOptions>({
    text: '',
    value: '',
  })

  const [lastToCurrency, setLastToCurrency] = useState<ISelectBoxOptions>({
    text: '',
    value: '',
  })

  const [lastResultConverted, setLastResultConverted] = useState('')

  const [status, setStatus] = useState<StateStatusEnum>(StateStatusEnum.idle)

  // const [isConvtLoading, setIsConvterLoading] = useState(false)

  const isConvtLoading = useMemo(() => status === StateStatusEnum.loading, [status])
  const isConvtetError = useMemo(() => status === StateStatusEnum.error, [status])
  const isConvtetSuccess = useMemo(() => status === StateStatusEnum.success, [status])

  const handleSwitchFromtTo = useCallback(() => {
    const aux = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(aux)
  }, [fromCurrency, toCurrency])

  const handleSubmitConvetCurrencies = useCallback(async () => {
    setStatus(StateStatusEnum.loading)
    try {
      const response = await apiBase.get<{ result: number }>('/convert', {
        params: {
          amount: removeCurrencyMask(amoutInput),
          fromCurrencyCode: fromCurrency.value,
          toCurrencyCode: toCurrency.value,
        },
      })
      setLastFromToCurrency(fromCurrency)
      setLastToCurrency(toCurrency)
      setLastAmoutInput(amoutInput)
      setStatus(StateStatusEnum.success)
      setLastResultConverted(getCurrencyFormat(response.data.result))
    } catch (err) {
      setStatus(StateStatusEnum.error)
    }
  }, [fromCurrency, toCurrency, amoutInput])

  useEffect(() => {
    setAmoutInput((currentAmount) => addCurrencyMask(currentAmount))
  }, [fromCurrency])

  return (
    <div className="flex justify-center w-full h-full">
      <Card className="max-w-7xl w-full">
        <CardHeader>
          <CardTitle>Converter</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <FormGroup>
                <FormLabel>Valor</FormLabel>
                <InputTextCurrency
                  id="amout"
                  value={amoutInput}
                  onChangeMaskValue={(value) => {
                    console.log(value)
                    setAmoutInput(value)
                  }}
                />
              </FormGroup>
            </div>
            <div className="col-span-12 md:col-span-4">
              <FormGroup>
                <FormLabel>De</FormLabel>
                <SelectBox
                  id="from-currency"
                  selectedOption={fromCurrency}
                  options={selelectBoxOptions}
                  onChange={(option) => setFromCurrency(option)}
                />
              </FormGroup>
            </div>
            <div className="flex items-end col-span-12 md:col-span-1">
              <Button
                className="w-full px-1"
                variant="primary"
                onClick={handleSwitchFromtTo}
              >
                <FaExchangeAlt className="rotate-90 md:rotate-0" size={18} />
              </Button>
            </div>
            <div className="col-span-12 md:col-span-4">
              <FormGroup>
                <FormLabel>Para</FormLabel>
                <SelectBox
                  id="to-currency"
                  selectedOption={toCurrency}
                  options={selelectBoxOptions}
                  onChange={(option) => setToCurrency(option)}
                />
              </FormGroup>
            </div>
            <div className="col-span-12">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  isLoading={isConvtLoading}
                  onClick={handleSubmitConvetCurrencies}
                >
                  Converter
                </Button>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col">
                {isConvtetSuccess ? (
                  <>
                    <p className="text-base">
                      {lastAmoutInput} ({lastFromCurrency.text}) =
                    </p>
                    <p className="text-3xl">
                      {lastResultConverted} ({lastToCurrency.text})
                    </p>
                  </>
                ) : isConvtetError ? (
                  <Alert variant="danger">OPSS, OCORREU UM ERRO NA CONVERSÃO</Alert>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
