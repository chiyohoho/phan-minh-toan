import {
  Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  const [valueUSD, setValueUSD] = useState()
  const [valueVND, setValueVND] = useState()
  const handleOnChangeValueUSD = (e) => {
    setValueUSD(e.target.value)
    setValueVND(e.target.value * 25000)
  }
  const handleOnChangeValueVND = (e) => {
    setValueVND(e.target.value)
    setValueUSD(e.target.value / 25000)
  }

  const [userA, setUserA] = useState(500000)
  const [userB, setUserB] = useState(500000)

  const [valueSendUserA, setValueSendUserA] = useState(0)
  const [valueSendUserB, setValueSendUserB] = useState(0)

  const handleConfirmBeforeTransfer = () => {
    if (valueSendUserA || valueSendUserB) {
      onOpen()
    } else {
      showToast('Warning', 'Please enter any number and try again', 'warning')
    }
  }

  const handleTransferBalance = () => {

    if (valueSendUserA && !valueSendUserB) {
      if (valueSendUserA > userA) {
        showToast('Failed', `You do not have enough balance to make this transaction`, 'error')
        setValueSendUserA(0)
        setValueSendUserB(0)
        onClose()
      } else {
        setUserA(userA - valueSendUserA)
        setUserB(userB + parseInt(valueSendUserA))
        onClose()
        showToast('Success', `You have successfully transferred ${valueSendUserA} to userB`, 'success')
        setValueSendUserA(0)
        setValueSendUserB(0)
      }
    } else if (!valueSendUserA && valueSendUserB) {
      if (valueSendUserB > userB) {
        showToast('Failed', `You do not have enough balance to make this transaction`, 'error')
        onClose()
      } else {
        setUserB(userB - valueSendUserB)
        setUserA(userA + parseInt(valueSendUserB))
        onClose()
        showToast('Success', `You have successfully transferred ${valueSendUserB} to userA`, 'success')
        setValueSendUserA(0)
        setValueSendUserB(0)
      }
    } else {
      onClose()
      showToast('Warning', `You cannot make a transaction from 2 sides at the same time, please try again`, 'warning')
      setValueSendUserA(0)
      setValueSendUserB(0)
    }
  }


  return (
    <Box mt={100}>
      <Box w={400} mx={'auto'} border={'1px solid #ccc'} rounded={10} px={5} pb={5}>
        <Text my={5} fontWeight={700}>Convert Money</Text>
        <Box mb={5}>
          <Text fontWeight={500}>USD</Text>
          <Input value={valueUSD} type='number' onChange={(e) => handleOnChangeValueUSD(e)} placeholder='enter a number...' w={'100%'} />
        </Box>

        <Box>
          <Text fontWeight={500}>VND</Text>
          <Input value={valueVND} type='number' onChange={(e) => handleOnChangeValueVND(e)} placeholder='enter a number...' w={'100%'} />
        </Box>
      </Box>

      <Box w={400} mt={20} mx={'auto'} border={'1px solid #ccc'} rounded={10} px={5} pb={5}>
        <Text my={5} fontWeight={700}>Transfer Money</Text>
        <Box mb={5}>
          <Text fontWeight={500}>UserA balance: {userA}</Text>
          <Input value={valueSendUserA} type='number' onChange={(e) => setValueSendUserA(e.target.value)} placeholder='enter a number...' w={'100%'} />
        </Box>

        <Button onClick={handleConfirmBeforeTransfer} mb={5} colorScheme='teal'>
          Transfer
        </Button>

        <Box>
          <Text fontWeight={500}>UserB balance: {userB}</Text>
          <Input value={valueSendUserB} type='number' onChange={(e) => setValueSendUserB(e.target.value)} placeholder='enter a number...' w={'100%'} />
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure to confirm the transfer?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleTransferBalance} variant='ghost'>Transfer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default App
