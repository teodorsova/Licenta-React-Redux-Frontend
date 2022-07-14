import { Container, Grid, GridItem, Heading, Stack, Text, Button, Box, FormControl, InputGroup, Input, Icon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Visa, Mastercard, Maestro } from 'react-pay-icons'
import { useDispatch, useSelector } from 'react-redux'
import { BsTrash } from 'react-icons/bs'
import { createFurnitureAsync, createFurnitureOrderAsync, createOrderAsync, resetOrderState } from '../../redux/orders/thunks'
import { Navigate, useNavigate } from 'react-router-dom'

const CheckOut = () => {
    const { user } = useSelector(state => state.user)
    const { order, successfulCreation, successfulFurnitureCreation, successfulFurnitureOrderCreation, furniture } = useSelector(state => state.orders)
    const [checkOutElements, setCheckOutElements] = useState([])
    const [cardNumber, setCardNumber] = useState("")
    const [cvc, setCvc] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cardHolderName, setCardHolderName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [display, setDisplay] = useState("none")
    const [furnitureCounter, setFurnitureCounter] = useState(0)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    var price = 0.0;

    useEffect(() => {
        Object.keys(localStorage).forEach((element) => {
            if (!isNaN(parseInt(element))) {
                setCheckOutElements(checkOutElements => [...checkOutElements, JSON.parse(localStorage.getItem(element))])
            }
        })
    }, [])
    
    useEffect(() => {
        if (successfulCreation) {
            checkOutElements.forEach((element) => {

                const appendItem = (() => new Promise((resolve, reject) => {

                    dispatch(createFurnitureAsync({
                        CompanyName: element.CompanyName,
                        Price: element.Price,
                        Name: element.Name,
                    }));
                    resolve();
                }))
                appendItem()
            })
        }
    }, [successfulCreation, order])

    useEffect(() => {
        if (successfulFurnitureCreation) {
            console.log(furniture)
            if(order)
            if (order.id !== undefined) {
                dispatch(createFurnitureOrderAsync({
                    OrderModelId: order.id,
                    FurnitureModelId: furniture.id,
                    OrderingUserId: user.id
                }))
                setFurnitureCounter(furnitureCounter + 1);
            }
        }
    }, [successfulFurnitureCreation, furniture])

    useEffect(() => {
        if(furnitureCounter === checkOutElements.length && furnitureCounter !== 0) {
            clearBasket()
            dispatch(resetOrderState())
            navigate('/orders')
        }
    }, [furnitureCounter])


    const clearBasket = () => {
        Object.keys(localStorage).forEach((element) => {
            if (!isNaN(parseInt(element))) {
                localStorage.removeItem(element)
            }
        })
        setCheckOutElements([])
    }

    const handlePaymentButton = () => {
        if (cardNumber === undefined || cvc === undefined || expDate === "" || cardHolderName === "") {
            setDisplay('block')
        } else {
            dispatch(createOrderAsync({ UserId: user.id, AddressLine1: addressLine1, AddressLine2: addressLine2  }))
           
        }
    }

    return (
        <>
            {checkOutElements.length === 0 ?
                <Container maxW="container.xl" backgroundColor="whiteAlpha.700" borderRadius="5px" mt={8} mb={8} p={{ base: "8", md: "32" }}>
                    <Text fontSize="3rem" color="blackAlpha.800" textAlign="center">Your basket is empty!</Text>
                    <Text fontSize="1.5rem" color="blackAlpha.500" textAlign="center">Go to the 3D modeler and add some pieces of furniture.</Text>
                </Container>
                :
                <Container maxW="container.xl">
                    <Text textAlign="center" fontSize="3.2rem" fontWeight="bold" color="blackAlpha.800">Your basket</Text>
                    <Grid templateColumns={{ base: "100%", md: "50% 50%" }} backgroundColor="whiteAlpha.900" borderRadius={"5px"} m={4} mb={8}>
                        <GridItem p={8}>
                            {checkOutElements.map((element, index) => {
                                price += parseFloat(element.Price)
                                return (<div key={Math.random()}>
                                    <Text color="blackAlpha.800" backgroundColor="gray.200" fontSize="1.5rem" borderBottom="1px solid gray" borderTop="1px solid gray">Item no: {index + 1}</Text>
                                    <Grid templateColumns="80% 20%">
                                        <GridItem>
                                            <Stack>
                                                <Text color="blackAlpha.700">
                                                    Name: {element.Name}
                                                </Text>
                                                <Text color="blackAlpha.700">
                                                    Price: {element.Price} RON
                                                </Text>
                                                <Text color="blackAlpha.700">
                                                    Company: {element.CompanyName}
                                                </Text>
                                            </Stack>
                                        </GridItem>
                                        <GridItem>
                                            <Button colorScheme="linkedin" float="right" mt={8} mb={8}><BsTrash /></Button>
                                        </GridItem>
                                    </Grid>
                                </div>
                                )
                            }
                            )}
                        </GridItem>
                        <GridItem p={8}>
                            <Stack>
                                <Text color="black" fontSize="2.5rem" fontWeight="bold" textAlign="center">Total: {price} RON</Text>

                            </Stack>
                            <Text color="black" fontSize="1.7rem" textAlign="center">Delivery details:</Text>
                            <Box backgroundColor="whiteAlpha.900" borderRadius={"5px"} p={4}>
                                <FormControl>
                                    <InputGroup>
                                        <Stack width="50%">
                                            <Text color="blackAlpha.900">First name:</Text>
                                            <Input boxShadow="10px" placeholder="John Smith" type="text" value={user.firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                                        </Stack>
                                        <Stack width="50%">
                                            <Text color="blackAlpha.900">Last name:</Text>
                                            <Input boxShadow="10px" placeholder="John Smith" type="text" value={user.lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                        </Stack>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <Text color="blackAlpha.900">Address line 1:</Text>
                                    <InputGroup>
                                        <Input boxShadow="10px" placeholder="Street, number etc." type="text" value={addressLine1} onChange={(e) => { setAddressLine1(e.target.value) }} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <Text color="blackAlpha.900">Address line 2:</Text>
                                    <InputGroup>
                                        <Input boxShadow="10px" placeholder="Unit, floor, ap. etc." type="text" value={addressLine2} onChange={(e) => { setAddressLine2(e.target.value) }} />
                                    </InputGroup>
                                </FormControl>
                            </Box>
                            <Text color="black" fontSize="1.7rem" textAlign="center">Payment details:</Text>
                            <Box backgroundColor="whiteAlpha.900" borderRadius={"5px"} p={4}>
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
                                </Stack>
                                <Box backgroundColor="red.500" mt={8} borderRadius="5px" display={display}>
                                    <Text p={4} textAlign="center" >Please fill in all the details!</Text>
                                </Box>
                                <Stack mt={8}>
                                    <Button colorScheme="teal" onClick={handlePaymentButton}>Complete Order</Button>
                                    <Button onClick={clearBasket} colorScheme="red">Clear basket</Button>
                                </Stack>
                            </Box>
                        </GridItem>
                    </Grid>
                </Container>
            }
        </>
    )
}

export default CheckOut