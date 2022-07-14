import { Box, Container, Grid, Text, GridItem } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAsync } from '../../redux/orders/thunks'
import Order from './Order'

const OrdersDashboard = () => {

  const { orders } = useSelector(state => state.orders)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getOrdersAsync({ UserId: user.id }))
  }, [])

  var processing = 0;
  var processed = 0;

  return (
    <Container maxW="container.xl">
      <Text textAlign="center" fontSize="3rem" color="#1C4532" fontWeight="bold" mt={8} mb={8}>Orders:</Text>
      <Box p={{ base: "2", md: "8" }} borderRadius="5px" backgroundColor="whitesmoke" mb={8}>
        {orders.length === 0 ? <Text fontSize="3rem" color="black" textAlign="center" p={32}>You have no orders!</Text>
          :
          <>
            <Grid templateColumns={{ base: "none", md: "33.33% 33.33% 33.33%" }}>
              <GridItem textAlign="center" backgroundColor={"teal.300"} p={8} m={4} borderRadius="5px">
                <Text fontSize="2rem">Total:</Text>
                <Text fontSize="1.5rem">{orders.length} order(s).</Text>
              </GridItem>
              <GridItem textAlign="center" backgroundColor={"blue.100"} p={8} m={4} borderRadius="5px" >
                <Text fontSize="2rem" color="black">Processing:</Text>
                {orders.map(order => {
                  
                  order['item1'].map(furniture => {
                    if(furniture.status === 'Processing') {
                      processing = processing + 1;
                    } else {
                      processed = processed + 1;
                    }
                  })
                })}
                <Text fontSize="1.5rem" color="black"> {processing} furniture piece(s).</Text>
              </GridItem>

              <GridItem textAlign="center" backgroundColor={"red.100"} p={8} m={4} borderRadius="5px" >
                <Text fontSize="2rem" color="black">Completed:</Text>
                <Text fontSize="1.5rem" color="black">{processed} furniture piece(s).</Text>
              </GridItem>
            </Grid>
            {orders.slice(0).reverse().map((order, index) => {

              return (
                <Box backgroundColor="gray.300" m={4} p={8} key={index} borderRadius="5px">
                  <Order order={order} />
                </Box>)


            }
            )}
          </>
        }
      </Box>
    </Container>
  )
}

export default OrdersDashboard