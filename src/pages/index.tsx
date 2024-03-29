import type { NextPage } from 'next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'
import Alert from '../components/ui/feedback/Alert'
import Button from '../components/ui/forms/Button'
import FormGroup from '../components/ui/forms/FormGroup'
import FormLabel from '../components/ui/forms/FormLabel'
import InputTextCurrency from '../components/ui/forms/InputCurrency'
import SelectBox, { ISelectBoxOptions } from '../components/ui/forms/SelectBox'
// import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/layout/Card'
import { apiBase } from '../services/apiBase'
import { StateStatusEnum } from '../types/Global'
import { currenciesOptions } from '../utils/currenciesOptions'
import { getCurrencyFormat } from '../utils/getCurrencyFormat'
import { addCurrencyMask, removeCurrencyMask } from '../utils/mask'
import { Card, SelectOption, Select } from 'hikari-ui'

const Home: NextPage = () => {
  const [lastAmoutInput, setLastAmoutInput] = useState('')
  const [amoutInput, setAmoutInput] = useState('R$ 1,00')
  const [fromCurrency, setFromCurrency] = useState<SelectOption>({
    label: 'BRL - Real brasileiro',
    value: 'BRL',
  })
  const [toCurrency, setToCurrency] = useState<SelectOption>({
    label: 'USD - Dólar dos EUA',
    value: 'USD',
  })
  const selelectBoxOptions = useMemo<ISelectBoxOptions[]>(() => {
    return currenciesOptions.map((opt) => ({
      text: `${opt.code} - ${opt.name}`,
      value: opt.code,
    }))
  }, [])

  const selelectOptions = useMemo<SelectOption[]>(() => {
    return currenciesOptions.map((opt) => ({
      label: `${opt.code} - ${opt.name}`,
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

  const isConvertLoading = useMemo(() => status === StateStatusEnum.loading, [status])
  const isConvertError = useMemo(() => status === StateStatusEnum.error, [status])
  const isConvertSuccess = useMemo(() => status === StateStatusEnum.success, [status])

  const handleThemeSwitchFromtTo = useCallback(() => {
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
      <Card className="max-w-7xl w-full mb-16">
        <Card.Header>
          <Card.Title>Converter</Card.Title>
        </Card.Header>
        <Card.Body>
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
                  disabled={isConvertLoading}
                />
              </FormGroup>
            </div>
            <div className="col-span-12 md:col-span-4">
              <Select
                label="De"
                id="from-currency"
                value={fromCurrency}
                isAutocomplite
                options={selelectOptions}
                onChangeSingleOption={setFromCurrency}
                isDisabled={isConvertLoading}
              />
            </div>
            <div className="flex items-end col-span-12 md:col-span-1">
              <Button
                className="w-full px-1"
                variant="primary"
                onClick={handleThemeSwitchFromtTo}
                disabled={isConvertLoading}
              >
                <FaExchangeAlt className="rotate-90 md:rotate-0" size={18} />
              </Button>
            </div>
            <div className="col-span-12 md:col-span-4">
              <Select
                label="Para"
                id="to-currency"
                value={toCurrency}
                isAutocomplite
                options={selelectOptions}
                onChangeSingleOption={setToCurrency}
                isDisabled={isConvertLoading}
              />
            </div>
            <div className="col-span-12">
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  isLoading={isConvertLoading}
                  onClick={handleSubmitConvetCurrencies}
                >
                  Converter
                </Button>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col">
                {isConvertSuccess ? (
                  <>
                    <p className="text-base dark:text-light">
                      {lastAmoutInput} ({lastFromCurrency.text}) =
                    </p>
                    <p className="text-3xl dark:text-light">
                      {lastResultConverted} ({lastToCurrency.text})
                    </p>
                  </>
                ) : isConvertError ? (
                  <Alert variant="danger">OPSS, OCORREU UM ERRO NA CONVERSÃO</Alert>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Home
