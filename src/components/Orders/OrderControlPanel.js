import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Grid, Text, GridItem } from '@chakra-ui/react'
import OrdersService from '../../services/OrdersService'
import { useDispatch, useSelector } from 'react-redux'
import { useStateIfMounted } from 'use-state-if-mounted'
import { getFurnituresForCompanyAsync } from "../../redux/orders/thunks";
import CompanyOrder from './CompanyOrder'

const OrderControlPanel = () => {

    const { user } = useSelector(state => state.user)
    const { successfulFurnitureForCompaniesCreation, ordersForCompanies } = useSelector(state => state.orders)
    const [orders, setOrders] = useState(ordersForCompanies)
    const dispatch = useDispatch()
    const [processed, setProcessed] = useState(0)
    const [processing, setProcessing] = useState(0)

    useEffect(() => {
        dispatch(getFurnituresForCompanyAsync(user.id))
    }, [])

    useEffect(() => {
        if (successfulFurnitureForCompaniesCreation === true)
            setOrders(ordersForCompanies)
            var prc1 = 0;
            var prc2 = 0;
            orders.map(order => {
                
                order['item2'].map(furniture => {
                    if (furniture.status === 'Processing') {
                       prc1 = prc1 + 1;
                    } else {
                        prc2 = prc2 + 1;
                    }
                    
                })
            })

            setProcessing(prc1);
            setProcessed(prc2);
    }, [successfulFurnitureForCompaniesCreation])

    const changeProcessed = (value) => {
        setProcessed(processed + value)
      }
    
      const changeProcessing = (value) => {
        setProcessing(processing + value)
      }

    return (
        <>
            <Container maxW="container.xl">
                <Text textAlign="center" fontSize="3rem" color="#1C4532" fontWeight="bold" mt={8} mb={8}>Order requests:</Text>
                <Box p={{ base: "2", md: "8" }} borderRadius="5px" backgroundColor="whitesmoke" mb={8}>
                    {orders !== undefined ? orders.length === 0 ? <Text fontSize="3rem" color="black" textAlign="center">You have no orders!</Text>
                        :
                        <>
                            <Grid templateColumns={{ base: "none", md: "33.33% 33.33% 33.33%" }}>
                                <GridItem textAlign="center" backgroundColor={"teal.300"} p={8} m={4} borderRadius="5px">
                                    <Text fontSize="2rem">Total:</Text>
                                    <Text fontSize="1.5rem">{orders.length} orders.</Text>
                                </GridItem>
                                <GridItem textAlign="center" backgroundColor={"blue.100"} p={8} m={4} borderRadius="5px" >
                                    <Text fontSize="2rem" color="black">Processing:</Text>
                                    <Text fontSize="1.5rem" color="black">{processing} furniture piece(s).</Text>
                                </GridItem>

                                <GridItem textAlign="center" backgroundColor={"red.100"} p={8} m={4} borderRadius="5px" >
                                    <Text fontSize="2rem" color="black">Completed:</Text>
                                    <Text fontSize="1.5rem" color="black">{processed} furniture piece(s).</Text>
                                </GridItem>
                            </Grid>
                            {orders.slice(0).reverse().map((order, index) => {
                                return (<div key={index}>{
                                    <CompanyOrder 
                                        order={order['item1']} 
                                        furnitures={order['item2']} 
                                        index={index} 
                                        changeProcessed={changeProcessed} 
                                        changeProcessing={changeProcessing}
                                        />
                                }</div>)
                            })}
                        </>
                        : <></>}
                </Box>
            </Container>
        </>
    )
}

export default OrderControlPanel