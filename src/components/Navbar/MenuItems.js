import { Box, Flex, Grid, GridItem, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import MenuItem from './MenuItem'
import { BsBasket } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FaUnity} from 'react-icons/fa'
import { AiOutlineHome, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { ImExit } from 'react-icons/im'
import { VscBell, VscBellDot} from 'react-icons/vsc'

const MenuItems = ({ isOpen = true, fullName = "" }) => {
    const { user } = useSelector(state => state.user)

    var loggedInNavLinks = (<>
            <MenuItem h="32px" to="/modeler"><Icon h="28px" w="28px"><FaUnity size="1rem" /></Icon>3DModeler</MenuItem>
            <MenuItem h="32px" to="/profile"><Icon h="28px" w="28px"><CgProfile size="1rem" /></Icon>Welcome, {fullName}!</MenuItem>
            <MenuItem h="32px" to="/basket"><Icon h="28px" w="28px"><BsBasket size="1rem" /></Icon>Your basket</MenuItem>
            {user!== undefined ? 
                (user.companyName!== "" ? 
                    <MenuItem h="32px" to="/requests"><Icon h="28px" w="28px"><VscBell size="1rem" /></Icon>Notfications</MenuItem> 
                    : <></>) 
                : <></>}
            <MenuItem h="32px" to="logout"><Icon h="28px" w="28px"><ImExit size="1rem" /></Icon>Log out</MenuItem>
            
    </>)

    var loggedOutNavLinks = (<>
        <MenuItem h="32px" to="/register" fontWeight='bold'><Icon h="28px" w="28px"><AiOutlineUserAdd size="1rem" /></Icon>Sign Up</MenuItem>
        <MenuItem h="32px" to="/login" fontWeight='bold'><Icon h="28px" w="28px"><AiOutlineUser size="1rem" /></Icon>Sign in</MenuItem>
    </>)

    return (
        <Box display={{ base: isOpen ? "block" : "none", lg: "block" }}
            flexBasis={{ base: "100%", lg: "auto" }}>
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "column", "column", "row"]}
                pt={[4, 4, 0, 0]}>
                <MenuItem h="32px" fontWeight='bold' to="/"><Icon h="28px" w="28px"><AiOutlineHome size="1rem" /></Icon>Home</MenuItem>
                
                {fullName === "" ? loggedOutNavLinks : loggedInNavLinks}
            </Stack>
        </Box>
    )
}

export default MenuItems