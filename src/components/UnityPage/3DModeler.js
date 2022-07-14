import React, { useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { Text, Container, Flex, Table, Thead, Tbody, TableContainer, Button, Tr, Th, Td, Box, Stack, Link } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/users/thunks";
import { useStateIfMounted } from "use-state-if-mounted";



function Modeler(props) {
    const [furnitures, setFurnitures] = useStateIfMounted({count: 0, arr: []})
    const [unityContext, setUnityContext] = useStateIfMounted(props.unityContext)
    var totalPrice = 0.0;

    unityContext.on("FurnitureSpawn", function (name, price, companyName) {
        var jsonData = { Name: name, Price: price, CompanyName: companyName }   
        setFurnitures({count: furnitures.count+1, arr: [...furnitures.arr, jsonData]})     
    })

    useEffect(() => {
        let tempFurnitureArray = []
        Object.keys(localStorage).forEach((element) => {
            
            if (!isNaN(parseInt(element))) {
                tempFurnitureArray.push(JSON.parse(localStorage.getItem(element)))
            }
            
        })
        setFurnitures({count: tempFurnitureArray.length, arr: tempFurnitureArray})
    }, [setFurnitures])

    function handleOnClickFullscreen() {
        props.unityContext.setFullscreen(true);
    }

    function deleteFurniture(name, i) {
        props.unityContext.send("Container", "DeleteFurniture", name);
        let index = furnitures.arr.indexOf(furnitures.arr.find((furniture) => furniture['Name'] === name));
        localStorage.removeItem(i)
        localStorage.removeItem(furnitures.count - 1)
        setFurnitures({count: furnitures.count-1, arr: [...furnitures.arr.slice(0, index), ...furnitures.arr.slice(index + 1)]})
    }

    return (<>
            <Container maxW="container.xl">
                <Flex direction="column">
                    <Box backgroundColor="white" borderRadius="5px" p={8} mt={8} mb={8}>
                        <Text fontSize="25" color="teal.600">
                            As you'll start configuring your virtual room, all items will appear below. After you're ready,
                            you'll be able to check out your basket!
                        </Text >
                        <br />
                        <Text fontSize="25" color="teal.600">
                            Select each furniture piece one by one and press <b>Q</b> or <b>E</b> to rotate them!
                        </Text>
                    </Box>
                    <Unity unityContext={unityContext} devicePixelRatio={2} style={{
                        aspectRatio: "16/10",
                        width: "100%",
                        border: "2px solid black",
                        background: "grey",
                        borderRadius: "5px",
                    }} />

                    <TableContainer>
                        <Table size="md" colorScheme="teal" backgroundColor="white" borderRadius="5px" mt={8}>
                            <Thead>
                                <Tr>
                                    <Th>Item</Th>
                                    <Th>Price</Th>
                                    <Th>Company Name</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {furnitures.arr.map((piece, index) => {
                                    totalPrice += parseFloat(piece["Price"])
                                    localStorage.setItem(index, JSON.stringify(piece))
                                    return (
                                        <Tr key={index}>
                                            <Td>
                                                {piece["Name"]}
                                            </Td>
                                            <Td>
                                                {piece["Price"] + " RON"}
                                            </Td>
                                            <Td>
                                                {piece["CompanyName"]}
                                            </Td>
                                            <Td>
                                                <Button onClick={() => deleteFurniture(piece["Name"], index)}>Delete</Button>
                                            </Td>
                                        </Tr>
                                    )

                                })}
                            </Tbody>
                        </Table>
                        <Box>
                            <Stack direction={['column', 'column', 'row']} spacing="24px" p={8} borderRadius="5px" backgroundColor="white" mt={8} mb={8}>
                                <Text fontSize="30" fontWeight="bold" color="teal.400">
                                    Total: {totalPrice} RON
                                </Text>
                                <Button colorScheme="green" onClick={handleOnClickFullscreen}>Fullscreen</Button>
                                <Button>
                                    <Link href="/basket" textDecoration="none">
                                    Check out
                                    </Link>
                                </Button>
                            </Stack>
                        </Box>
                    </TableContainer>
                </Flex>
            </Container>
    </>)
}

export default Modeler;