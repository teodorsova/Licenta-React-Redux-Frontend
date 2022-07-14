import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    FormControl,
    FormHelperText,
    Checkbox,
    Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import countryCodesJSON from '../../res/json/countryCodes.json'
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../../redux/users/thunks";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);
const CFaPhoneAlt = chakra(FaPhoneAlt);

const Register2 = () => {
    const { registerSuccessful } = useSelector(state => state.user)
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [companyForm, setCompanyForm] = useState(<></>)
    const [checkBox, setCheckBox] = useState(false)
    const [display, setDisplay] = useState("none");
    const [displayMessage, setDisplayMessage] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (registerSuccessful === true) {
            navigate("/login");
        }
    }, [registerSuccessful, navigate])

    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }


    const handleRegister = async () => {
        setDisplay('none')
        if (password !== repeatPassword) {
            setDisplayMessage("Passwords don't match!")
            setDisplay('block')
        } else if(!firstName || !lastName || !email || !password || !repeatPassword || !phoneNo || (checkBox === true && !companyName)) {
            setDisplayMessage("Please fill in all the fields!")
            setDisplay('block')
        } else {
            var data = JSON.stringify({
                "FirstName": firstName,
                "LastName": lastName,
                "Password": password,
                "Email": email,
                "PhoneNo": phoneNo,
                "Role": companyName === "" ? "User" : "Company",
                "CompanyName": companyName
            });
            dispatch(registerUserAsync(data))
        }

        await sleep(2000);
        setDisplay('none')

    }

    useEffect(() => {
        if (checkBox) {
            setCompanyForm(<>
                <FormControl>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<CFaUserAlt color="gray.300" />}
                        />
                        <Input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </InputGroup>
                </FormControl>
            </>)
        } else {
            setCompanyForm(<></>)
            setCompanyName("")
        }
    }, [checkBox, companyName])


    return (
        <Flex
            flexDirection="column"
            width="100wh"
            minHeight="80vh"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Heading color="#1C4532" fontWeight="bold">Sign up</Heading>
                <Box minW={{ base: "95vw", md: "576px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p={{ base: "1rem", sm: "5rem" }}
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                            borderRadius="5px"
                        >
                            <Box backgroundColor="red.500" p={2} borderRadius="5px" textAlign="center" display={display}>
                                <Text>{displayMessage}</Text>
                            </Box>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaUserAlt color="gray.300" />}
                                    />
                                    <Input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaEnvelope color="gray.300" />}
                                    />
                                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </InputGroup>
                                <FormHelperText>
                                    We will never share your email with anyone else.
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input type="text" placeholder="Phone number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<CFaPhoneAlt color="gray.300" />}
                                    />
                                </InputGroup>
                                <FormHelperText>
                                    We will never share your phone number with anyone else.
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.300"
                                        children={<CFaLock color="gray.300" />}
                                    />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Repeat Password"
                                        value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            {companyForm}
                            <FormControl>
                                <Checkbox onChange={(e) => setCheckBox(!checkBox)}>
                                    Check this if you want a company account.
                                </Checkbox>
                            </FormControl>
                            <Button
                                borderRadius="5px"
                                variant="solid"
                                backgroundColor="#1C4532"
                                color="white"
                                width="full"
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Register2;
