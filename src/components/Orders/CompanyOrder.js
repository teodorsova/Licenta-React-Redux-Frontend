import { useDisclosure, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Collapse, Badge, Stack, Divider, Box, Grid, Select, GridItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateFurnitureStatusAsync } from '../../redux/orders/thunks';

const CompanyOrder = (props) => {
    var totalPrice = 0.0;
    const { isOpen, onToggle } = useDisclosure()
    const dispatch = useDispatch();
    const [furnitures, setFurnitures] = useState(props.furnitures)
    const { successfulFurnitureStatusUpdate } = useSelector(state => state.orders)

    const handleInputChange = (e, furnitureID, index) => {
        dispatch(updateFurnitureStatusAsync(furnitureID, e.target.value));
        if (furnitures[index].status === 'Processing') {
            props.changeProcessed(1)
            props.changeProcessing(-1)
        }
        furnitures[index].status = e.target.value;

    }

    useEffect(() => {
        setFurnitures(furnitures)
    }, [successfulFurnitureStatusUpdate])



    return (<>
        <Box backgroundColor="gray.200" p={8} borderRadius="5px" mb={8}>
            <Stack float="right">
                <Button onClick={onToggle} colorScheme="teal">View details</Button>
            </Stack>
            <Text color="black" fontSize="2rem" display="inline">Order ID: {props.order.id}</Text>
            <Text color="gray" fontSize="1rem">{new Date(props.order.date).toDateString()} {new Date(props.order.date).toLocaleTimeString()}</Text>
            <Collapse in={isOpen}>
                <TableContainer>
                    <Table size="md" colorScheme="teal" backgroundColor="white" borderRadius="5px" mt={8}>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Item</Th>
                                <Th>Price</Th>
                                <Th>Status</Th>
                                <Th>Change status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {furnitures.map((furniture, index) => {
                                var color = "";
                                furniture.status === 'Processing' ? color = "purple" : (furniture.status === 'Out of Stock' ? color = "red" : color = "green")
                                return (

                                    <Tr key={Math.random()}>
                                        <Td>{furniture.id}</Td>
                                        <Td>
                                            {furniture.name}
                                        </Td>
                                        <Td>
                                            {furniture.price} RON
                                        </Td>
                                        <Td>
                                            <Badge color={color}>{furniture.status}</Badge>
                                        </Td>
                                        <Td>
                                            <Select
                                                bg="gray.200"
                                                width="fit-content"
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    handleInputChange(e, furniture.id, index)
                                                }>
                                                <option hidden disabled value={'DEFAULT'}>{furniture.status}</option>
                                                <option>Out of Stock</option>
                                                <option>Out for delivery</option>
                                            </Select>
                                        </Td>
                                    </Tr>)

                            })
                            }
                        </Tbody>
                    </Table>

                </TableContainer>
                <Divider orientation='horizontal' m={2} color="black" />
                <Grid templateColumns={{ base: "none", md: "50% 50%" }}>
                    <GridItem>
                        <Text color="black"> Address Line 1: {props.order.addressLine1}</Text>
                        <Text color="black"> Address Line 2: {props.order.addressLine2}</Text>
                    </GridItem>
                    <GridItem >
                        <Button float="right" colorScheme="purple">Refuse all</Button>
                        <Button float="right" colorScheme="teal" mr={4}>Accept all</Button>
                    </GridItem>
                </Grid>
                <Divider orientation='horizontal' m={2} color="black" />
            </Collapse>
        </Box>
    </>
    )
}

export default CompanyOrder