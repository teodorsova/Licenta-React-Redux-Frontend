import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Logo from './Logo'
import MenuItems from './MenuItems'
import MenuToggle from './MenuToggle'

const NavBarContainer = ({ children }) => {
   
    

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            pt="5vh"
            pb="5vh"
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            color={["white", "white", "primary.700", "primary.700"]}
            pr={{base: 8, '2xl': 300}}
            pl={{base: 8, '2xl': 300}}
        >
            {children}
        </Flex>
    )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined);
    const toggle = () => setIsOpen(!isOpen)
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        try{
            setFirstName(user.firstName)
            setLastName(user.lastName)
        }catch(error) {
            setFirstName(undefined)
            setLastName(undefined)
        }
    }, [user])

    return (<>
        <div style={{backgroundColor:"#1C4532"}}>
            <NavBarContainer>
                <Logo />
                <MenuToggle toggle={toggle} isOpen={isOpen} />
                <MenuItems 
                    isOpen={isOpen} 
                    fullName={firstName === undefined || lastName === undefined ? 
                        "" : 
                        firstName + " " + lastName} />
            </NavBarContainer>
        </div>
    </>
    )
}

export default Navbar