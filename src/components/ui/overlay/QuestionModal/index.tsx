import { Modal, ModalContent, ModalProps } from '../Modal'
import styles from './styles.module.css'
import cn from 'classnames'
import { IoAlertCircleOutline } from 'react-icons/io5'
import Button from '../../forms/Button'
import { Callback } from '../../../../types/Global'

interface QuestionModalProps extends ModalProps {
  description?: string | JSX.Element
  textCancelButton?: string
  textConfirmButton?: string
  onConfirm: Callback
}

function QuestionModal({
  description,
  textConfirmButton,
  textCancelButton,
  onClose,
  onConfirm,
  ...rest
}: QuestionModalProps) {
  return (
    <Modal onClose={onClose} size="md" {...rest}>
      <ModalContent>
        <div className={cn(styles.root)}>
          <IoAlertCircleOutline className="text-warning" />
          <h4>{description}</h4>
          <div className="flex space-x-2">
            <Button variant="light" type="button" onClick={() => onClose?.()}>
              {textCancelButton || 'Não, cancelar'}
            </Button>
            <Button variant="warning" type="button" onClick={onConfirm}>
              {textConfirmButton || 'Sim'}
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default QuestionModal
