import React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DivWitchClickOutsideEvent from '../../overlay/DivWitchClickOutsideEvent'
import InputText from '../InputText'
import { FaCaretDown } from 'react-icons/fa'
import { List, ListItem } from '../../dataDisplay/List'
import ValidationError from '../../feedback/ValidationError'

export interface ISelectBoxOptions {
  value: string
  text: string
}

interface SelectBoxProps {
  id?: string
  className?: string
  options: ISelectBoxOptions[]
  selectedOption: ISelectBoxOptions
  placeholder?: string
  error?: string
  onChange?: (value: ISelectBoxOptions) => void
}

function SelectBox({
  className,
  options,
  id,
  selectedOption = { value: '', text: '' },
  placeholder = '',
  error,
  onChange,
}: SelectBoxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  const [filteredOptions, setFilteredOptions] = useState<ISelectBoxOptions[]>(options)

  const avaliableOptions = useMemo(() => {
    let avaliableOptionsTmp = [...options]
    console.log('avaliableOptionsTmp')
    if (selectedOption.value && selectedOption.text) {
      avaliableOptionsTmp = avaliableOptionsTmp.filter(
        (opt) => opt.value !== selectedOption.value
      )
      avaliableOptionsTmp = [selectedOption, ...avaliableOptionsTmp]
    }

    avaliableOptionsTmp = avaliableOptionsTmp.sort((a, b) => (a.text >= b.text ? 1 : -1))
    return avaliableOptionsTmp
  }, [options, selectedOption])

  useEffect(() => {
    const searchTrimmed = search.trim()
    if (searchTrimmed) {
      setFilteredOptions(() =>
        avaliableOptions.filter(({ text }) =>
          text.trim().toLowerCase().includes(searchTrimmed.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(avaliableOptions)
    }
  }, [search, avaliableOptions])

  const selectedValueText = useMemo(() => {
    const indexValueText = avaliableOptions.findIndex(
      (opt) => opt.value === selectedOption.value
    )
    if (indexValueText >= 0) {
      return avaliableOptions[indexValueText].text
    }
    return selectedOption.text
  }, [selectedOption, avaliableOptions])

  const handleChangeOptions = useCallback(
    (valueDate: ISelectBoxOptions) => {
      onChange?.(valueDate)
      setIsFocused(false)
    },
    [onChange]
  )

  return (
    <>
      <div
        id={id}
        className={cn(styles.root, error && styles.error, className)}
        role="searchbox"
        onClick={() => !isFocused && setIsFocused(true)}
      >
        <span>
          <p>
            {selectedValueText || <span className="text-secondary">{placeholder}</span>}
          </p>
        </span>
        {isFocused && (
          <DivWitchClickOutsideEvent
            onClickOutside={() => isFocused && setIsFocused(false)}
          >
            <span>
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </span>
            <List className="max-h-96 overflow-y-auto">
              {filteredOptions.map((opt, i) => (
                <ListItem
                  key={opt.value + i}
                  role="button"
                  onClick={() =>
                    handleChangeOptions({ value: opt.value, text: opt.text })
                  }
                  isActive={selectedOption.value === opt.value}
                >
                  {opt.text}
                </ListItem>
              ))}
            </List>
          </DivWitchClickOutsideEvent>
        )}
        <FaCaretDown className={cn(isFocused && 'rotate-180')} />
      </div>
      {error && <ValidationError>{error}</ValidationError>}
    </>
  )
}

export default SelectBox