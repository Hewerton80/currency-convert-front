import { Modal, ModalContent, ModalProps } from '../Modal'
import styles from './styles.module.css'
import cn from 'classnames'
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5'
import Button from '../../forms/Button'

const variants = {
  success: {
    text: 'Sucesso!',
    icon: <IoCheckmarkCircleOutline className="text-success" />,
  },
  info: {
    text: 'Info!',
    icon: <IoAlertCircleOutline className="text-info" />,
  },
  danger: {
    text: 'Erro!',
    icon: <IoCloseCircleOutline className="text-danger" />,
  },
}

interface AlertModalProps extends ModalProps {
  variant: keyof typeof variants
  description?: string | JSX.Element
  textButton?: string
}

function AlertModal({
  variant,
  description,
  textButton,
  onClose,
  ...rest
}: AlertModalProps) {
  return (
    <Modal onClose={onClose} size="md" {...rest}>
      <ModalContent>
        <div className={cn(styles.root, styles[variant])}>
          {variants[variant].icon}
          <h4>{variants[variant].text}</h4>
          <p>{description}</p>
          <Button variant={variant} type="button" onClick={() => onClose?.()}>
            {textButton || 'Ok'}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default AlertModal
