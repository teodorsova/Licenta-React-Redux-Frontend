import { Box, Grid, GridItem, Container, Image, Text, Heading, Stack, Button, Flex, Input, FormControl, InputGroup, FormLabel, Link } from "@chakra-ui/react";
import UserImage from '../../res/img/user.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, updateUser } from '../../redux/users/thunks';


function Profile() {

    const dispatch = useDispatch();

    const { user, updateErrorMessage, updateSuccessMessage } = useSelector((state) => state.user)
    const { subscription } = useSelector((state) => state.subscription)
    const [id, setId] = useState(user.id);
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [companyName, setCompanyName] = useState(user.companyName);
    const [phoneNo, setPhoneNo] = useState(user.phoneNo);

    useEffect(() => {
        if (updateErrorMessage !== "") {
            alert("Wrong password!")
        }
    }, [updateErrorMessage])

    useEffect(() => {
        if (updateSuccessMessage !== "") {
            dispatch(getUserAsync());
        }

    }, [updateSuccessMessage, dispatch])

   

    function handleUpdate() {
        var data = JSON.stringify({
            "Id": id,
            "FirstName": firstName,
            "LastName": lastName,
            "Email": email,
            "PhoneNo": phoneNo,
            "CompanyName": companyName,
            "Password": password
        });
        dispatch(updateUser(data))

    }

    return <>

        <Box>
            <Grid templateColumns={{ base: '100%', lg: "50% 50%" }}>
                <GridItem backgroundColor="teal.600" textAlign="center" pt={32} pb={32}>
                    <Stack textAlign="center" display="block">
                        <Image src={UserImage} width="50%" borderRadius="50%" display="inline-block" />
                        <Heading color="whiteAlpha.900">{user.firstName + " " + user.lastName}</Heading>
                        <Text>{user.companyName === "" ? "Customer account" : ("Company: " + user.companyName)}</Text>
                        <Text>{subscription === undefined ? (user.companyName === "" ? "" : "No active subscription.") : ("Active subscription: " + subscription.type)}</Text>
                        <Flex direction='column' pl={{ base: '10%', md: '25%' }} pr={{ base: '10%', md: '25%' }}>
                            <Button mb={2}><Text color="black" fontWeight="bold">Change profile picture</Text></Button>
                            <Link href="/orders"><Button mb={2} colorScheme="blackAlpha" width="100%"><Text fontWeight="bold">Order history</Text></Button></Link>
                            {companyName === "" ? <></> : <Link href="/subscription"><Button colorScheme="green" width="100%"><Text fontWeight="bold">View subscription</Text></Button></Link>}
                        </Flex>
                    </Stack>
                </GridItem>
                <GridItem>
                    <Flex
                        flexDirection="column"
                        width="100%"
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Stack
                            flexDir="column"
                            mb="2"
                            justifyContent="center"
                            alignItems="center"
                            width={{ base: "100%", xl: "576px" }}
                        >

                            <Box minW={{ base: "100%", xl: "576px" }}>

                                <form>

                                    <Stack
                                        spacing={4}
                                        p={{ base: "1rem", md: "4rem" }}
                                        backgroundColor="whiteAlpha.900"
                                        boxShadow="md"
                                        borderRadius="5px"
                                    >
                                        <Heading color="#1C4532" fontWeight="bold">Your profile:</Heading>

                                        <Container maxW="container.xl">
                                            <FormControl>
                                                <InputGroup>
                                                    <Stack w="100%">
                                                        <Text color="black">First Name:</Text>
                                                        <Input type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                    </Stack>
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl>
                                                <InputGroup>
                                                    <Stack w="100%">
                                                        <Text color="black">Last Name:</Text>
                                                        <Input type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                    </Stack>
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl>
                                                <InputGroup>
                                                    <Stack w="100%">
                                                        <Text color="black">Email:</Text>
                                                        <Input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    </Stack>
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl>
                                                <InputGroup>
                                                    <Stack w="100%">
                                                        <FormLabel>
                                                            <Text color="black">Phone number:</Text>
                                                        </FormLabel>
                                                        <Input type="text" placeholder="Enter phone number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                                                    </Stack>
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl>
                                                <InputGroup>
                                                    <Stack w="100%">
                                                        <Text color="black">Enter password to confirm changes:</Text>
                                                        <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </Stack>
                                                </InputGroup>
                                            </FormControl>
                                            <Button colorScheme="teal" mt={8} p={10} onClick={handleUpdate}>
                                                <Text fontWeight="bold" fontSize="1.4rem">Update profile</Text>
                                            </Button>
                                        </Container>
                                    </Stack>
                                </form>
                            </Box>
                        </Stack>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>


    </>
}

export default Profile;