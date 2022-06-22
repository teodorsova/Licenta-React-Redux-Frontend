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
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync, loginAsync } from "../../redux/users/thunks";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [display, setDisplay] = useState("none");
  const { isLoading, user, errorMessage, isChecking, successfulLogin } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (successfulLogin) {
      dispatch(getUserAsync())
      const path = '/'
      navigate(path)
    }
  }, [successfulLogin, navigate, dispatch])

  useEffect(() => {
    if(errorMessage !== undefined) {
      setDisplay("block")
    }
  },[errorMessage])

  function HandleSubmit(event) {
    setDisplay('none')
    var data = JSON.stringify({
      "Email": email,
      "Password": password
    });
    dispatch(loginAsync(data));

  }

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="#1C4532" fontWeight="bold">Welcome!</Heading>
        <Box minW={{ base: "95vw", md: "576px" }}>
          <form>
            <Stack
              spacing={4}
              p="5rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="5px"
            >
              <Box backgroundColor="red.500" p={2} borderRadius="5px" textAlign="center" display={display}>
                <Text>Invalid email/ password!</Text>
              </Box>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                  />
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius="5px"
                variant="solid"
                backgroundColor="#1C4532"
                color="white"
                width="full"
                onClick={HandleSubmit}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Don't have an account?{" "}
        <Link color="teal.500" href="/register">
          Sign Up
        </Link>
        {user !== undefined ? user.firstName : ""}
      </Box>
    </Flex>
  );
};

export default Login;
