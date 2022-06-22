import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { Visa, Mastercard, Maestro } from 'react-pay-icons'
import { useDispatch, useSelector } from 'react-redux';
import { createSubscriptionAsync, getSubscriptionAsync } from '../../redux/subscriptions/thunks';
const PaymentPage = (props) => {

  const { subscription, successfulCreation } = useSelector(state => state.subscription)
  const {user} = useSelector(state => state.user)
  const [cardNumber, setCardNumber] = useState()
  const [cvc, setCvc] = useState()
  const [expDate, setExpDate] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")
  const [display, setDisplay] = useState("none")

  const dispatch = useDispatch();

  const handleButtonClick = (e) => {
    if (cardNumber && cvc && expDate && cardHolderName) {
      //UserStore.createSubscription({Price: props.Price, Type: props.Type})
      //setSubscription(UserStore.subscription)
      dispatch(createSubscriptionAsync({Id: user.id, Price: props.Price, Type: props.Type}))
    } else {
      setDisplay("block")
    }
  }

  useEffect(() => {
    if(successfulCreation === true) {
      dispatch(getSubscriptionAsync({Id: user.id}))
    }
  }, [successfulCreation, dispatch, user.id])

  return (
    <>
      <Box>
        <Grid templateColumns={{ base: "100%", md: "50% 50%" }} backgroundColor="whiteAlpha.900" borderRadius={"5px"} m={4} mb={8}>
          <GridItem p={8}>
            <Text color="black" fontSize="2rem">Selected subscription: {props.Type}</Text>
            <Text color="black" fontSize="1.8rem">Price: RON {props.Price} per month.</Text>
          </GridItem>
          <GridItem p={8}>
            <FormControl>
              <Text color="blackAlpha.900">Card number:</Text>
              <InputGroup>
                <Input boxShadow="10px" placeholder="1234 5678 9012 3456" maxLength="19" type="text" value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Text color="blackAlpha.900">Holder name:</Text>
              <InputGroup>
                <Input boxShadow="10px" placeholder="John Smith" type="text" value={cardHolderName} onChange={(e) => { setCardHolderName(e.target.value) }} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Stack width="50%">
                  <Text color="blackAlpha.900">Exp. date:</Text>
                  <Input boxShadow="10px" placeholder="MM/YY" type="text" value={expDate} onChange={(e) => { setExpDate(e.target.value) }} />
                </Stack>
                <Stack width="50%">
                  <Text color="blackAlpha.900">CVC:</Text>
                  <Input boxShadow="10px" placeholder="123" type="number" value={cvc} onChange={(e) => { setCvc(e.target.value) }} />
                </Stack>
              </InputGroup>
            </FormControl>
            <Stack direction="row" mt={4}>
              <Visa width="50px" />
              <Mastercard width="50px" />
              <Box backgroundColor="red.600" width="100%" textAlign="center" borderRadius="5px" display={display} p={2}>
                <Text fontSize="1.2rem">Please fill in all the required details!</Text>
              </Box>
            </Stack>
            <Button onClick={handleButtonClick} colorScheme="teal" width="100%" mt={4}>Pay</Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}

export default PaymentPage