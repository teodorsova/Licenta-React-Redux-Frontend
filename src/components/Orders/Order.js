import { useDisclosure, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Collapse, Badge, Stack, Divider } from '@chakra-ui/react'
import React from 'react'

const Order = (props) => {

    var totalPrice = 0.0;
    const { isOpen, onToggle } = useDisclosure()

    return (<>
    <Stack float="right">
            <Button onClick={onToggle}  colorScheme="teal">View details</Button>
            
        </Stack>
        <Text color="black" fontSize="2rem" display="inline">Order ID: {props.order["item2"].id}</Text>
        <Text color="gray" fontSize="1rem">{new Date(props.order["item2"].date).toDateString()} {new Date(props.order["item2"].date).toLocaleTimeString()}</Text>
        
        
        <Collapse in={isOpen}>
            <TableContainer>
                <Table size="md" colorScheme="teal" backgroundColor="white" borderRadius="5px" mt={8}>
                    <Thead>
                        <Tr>
                            <Th>Item</Th>
                            <Th>Price</Th>
                            <Th>Company Name</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.order["item1"] === undefined ?
                            <Tr key={Math.random()}>
                                <Td>
                                    No data
                                </Td>
                                <Td>

                                </Td>
                                <Td>

                                </Td>
                            </Tr>
                            : props.order["item1"].map(furniture => {
                                totalPrice = totalPrice + furniture.price
                                var color="";
                                furniture.status === 'Processing' ? color="purple" : (furniture.status === 'Out of Stock' ? color = "red" : color = "green")
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
                                        <Td>
                                            <Badge color={color}>{furniture.status}</Badge>
                                        </Td>
                                    </Tr>)

                            })
                        }
                    </Tbody>
                </Table>
                
            </TableContainer>
            <Divider orientation='horizontal' m = {2} color="black"/>
            <Text color="black"> Address Line 1: {props.order["item2"].addressLine1}</Text>
            <Text color="black"> Address Line 2: {props.order["item2"].addressLine2}</Text>
            <Divider orientation='horizontal' m = {2} color="black"/>
        </Collapse>
        <Text fontSize="2rem" color="blackAlpha.700" fontWeight="bold">Total: {totalPrice} RON</Text>
        
    </>
    )
}

export default Order