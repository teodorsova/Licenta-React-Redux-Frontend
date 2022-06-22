import { Box, Container, Grid, TableContainer, Table, Th, Tr, Td, Thead, Tbody, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFurnituresForOrderAsync, getOrdersAsync, stopOrderLoad } from '../../redux/orders/thunks'

const OrdersDashboard = () => {

  const { orders, successfulOrdersLoad, furnituresSuccessfulLoad, furnitures } = useSelector(state => state.orders)
  const { user } = useSelector(state => state.user)
  const [furnituresForOrders, setFurnituresForOrders] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('i fire once');
    dispatch(getOrdersAsync({ UserId: user.id }))

  }, [])

  useEffect(() => {
    if (successfulOrdersLoad) {
      dispatch(stopOrderLoad())
      if (orders) {
        orders.forEach((order) => {
          const appendItem = (() => new Promise((resolve, reject) => {
            // do anything here
            dispatch(getFurnituresForOrderAsync({ OrderModelId: order.id }));
            console.log("call")
            resolve();
          }))
          appendItem().then(() => {
            console.log(furnitures)
            setFurnituresForOrders([furnitures])
          })
        })
      }

    }
  }, [successfulOrdersLoad])




  return (
    <Container maxW="container.xl">
      <Text textAlign="center" fontSize="3rem" color="#1C4532" fontWeight="bold" mt={8} mb={8}>Orders:</Text>
      <Box p={{ base: "2", md: "8" }} borderRadius="5px" backgroundColor="whitesmoke" mb={8}>
        {orders.length === 0 ? <Text fontSize="3rem" color="black" textAlign="center">You have no orders!</Text>
          :
          orders.map((order, index) => {
            var totalPrice = 0.0;
            return (
              <Box backgroundColor="gray.300" m={4} p={8} key={index} borderRadius="5px">
                <Text color="black" fontSize="2.5rem">Order ID: {order.id}</Text>
                <Text color="black">Status: {order.status}</Text>
                <TableContainer>
                  <Table size="md" colorScheme="teal" backgroundColor="white" borderRadius="5px" mt={8}>
                    <Thead>
                      <Tr>
                        <Th>Item</Th>
                        <Th>Price</Th>
                        <Th>Company Name</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {furnitures[index] === undefined ?
                        <Tr key={Math.random()}>
                          <Td>
                            No data
                          </Td>
                          <Td>

                          </Td>
                          <Td>

                          </Td>
                        </Tr>
                        : furnitures[index].map(furniture => {
                          totalPrice = totalPrice + furniture.price
                          return (

                            <Tr key={Math.random()}>
                              <Td>
                                {furniture.name}
                              </Td>
                              <Td>
                                {furniture.price} RON
                              </Td>
                              <Td>
                                {furniture.companyName}
                              </Td>
                            </Tr>)

                        })
                      }
                    </Tbody>
                  </Table>
                  <Text fontSize="2rem" color="blackAlpha.700" fontWeight="bold">Total: {totalPrice} RON</Text>
                </TableContainer>

              </Box>)

            
          }
          )
        }
      </Box>
    </Container>
  )
}

export default OrdersDashboard