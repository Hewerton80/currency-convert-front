import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DivWitchClickOutsideEvent from '../../overlay/DivWitchClickOutsideEvent'
import InputText from '../InputText'
import { IoClose } from 'react-icons/io5'
import { List, ListItem } from '../../dataDisplay/List'
import Badge from '../../dataDisplay/Badge'
import ValidationError from '../../feedback/ValidationError'

export interface IMultSelectBoxOptions {
  value: string
  text: string
}

interface MultSelectBoxProps {
  id?: string
  className?: string
  options: IMultSelectBoxOptions[]
  selectedOptions?: IMultSelectBoxOptions[]
  placeholder?: string
  error?: string
  onChange?: (values: IMultSelectBoxOptions[]) => void
}

function MultSelectBox({
  className,
  options,
  id,
  error,
  selectedOptions = [],
  placeholder = '',
  onChange,
}: MultSelectBoxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  const [filteredOptions, setFilteredOptions] = useState<IMultSelectBoxOptions[]>(options)

  const inputRef = useRef<HTMLInputElement>(null)

  const totalOptios = useMemo(() => {
    let totalOptiosTmp = [...options]

    const selectedOptionsValues = selectedOptions.map((selectedOpt) => selectedOpt.value)

    totalOptiosTmp = totalOptiosTmp.filter(
      (opt) => !selectedOptionsValues.includes(opt.value)
    )

    totalOptiosTmp = totalOptiosTmp.sort((a, b) => (a.text >= b.text ? 1 : -1))
    return totalOptiosTmp
  }, [options, selectedOptions])

  useEffect(() => {
    const searchTrimmed = search.trim()
    if (searchTrimmed) {
      setFilteredOptions(() =>
        totalOptios.filter(({ text }) =>
          text.trim().toLowerCase().includes(searchTrimmed.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(totalOptios)
    }
  }, [search, totalOptios])

  // const selectedValuesText = useMemo(() => {
  //   const indexValueText = totalOptios.findIndex(
  //     (opt) => opt.value === selectedOption.value
  //   )
  //   if (indexValueText >= 0) {
  //     return totalOptios[indexValueText].text
  //   }
  //   return []
  // }, [selectedOptions, totalOptios])

  const handleFocus = useCallback(() => {
    if (isFocused) {
      inputRef?.current?.blur()
    } else {
      setIsFocused(true)
      inputRef?.current?.focus()
    }
  }, [isFocused])

  const handleChangeOptions = useCallback(
    (valueDate: IMultSelectBoxOptions) => {
      onChange?.([...selectedOptions, valueDate])
      setIsFocused(false)
      setSearch('')
    },
    [selectedOptions, onChange]
  )

  const handleRemoveOption = useCallback(
    (value: string) => {
      const selectedOptionsTmp = [...selectedOptions].filter((opt) => opt.value !== value)
      onChange?.(selectedOptionsTmp)
      setSearch('')
      console.log('selectedOptionsTmp: ', selectedOptionsTmp)
    },
    [selectedOptions, onChange]
  )

  return (
    <>
      <div
        id={id}
        className={cn(styles.root, error && styles.error, className)}
        role="searchbox"
        onClick={handleFocus}
      >
        <span>
          <ul>
            {selectedOptions?.length > 0
              ? selectedOptions.map((selectedOpt, i) => (
                  <li key={selectedOpt.value + i}>
                    <Badge variant="primary" className="h-[22px] cursor-default">
                      <IoClose
                        className="text-white mr-1.5 cursor-pointer"
                        onClick={() => handleRemoveOption(selectedOpt.value)}
                      />{' '}
                      {selectedOpt.text}
                    </Badge>
                  </li>
                ))
              : !isFocused && (
                  <span className="text-secondary mt-1.5">{placeholder}</span>
                )}
            <li>
              {' '}
              <InputText
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: (search.length + 1) * 12 }}
              />
            </li>
          </ul>
        </span>
        {isFocused && (
          <DivWitchClickOutsideEvent onClickOutside={() => setIsFocused(false)}>
            <List>
              {filteredOptions.map((opt, i) => (
                <ListItem
                  key={opt.value + i}
                  role="button"
                  onClick={() =>
                    handleChangeOptions({ value: opt.value, text: opt.text })
                  }
                  // isActive={selectedOptions.map(sopt => sopt) === opt.value}
                >
                  {opt.text}
                </ListItem>
              ))}
            </List>
          </DivWitchClickOutsideEvent>
        )}
      </div>
      {error && <ValidationError>{error}</ValidationError>}
    </>
  )
}

export default MultSelectBox
