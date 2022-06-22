import { CloseIcon } from '@chakra-ui/icons'
import Menu from '../../res/img/menu.png'
import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const MenuToggle = ({toggle, isOpen}) => {
  return (
    <Box display= {{base: "block", lg: "none"}} onClick = {toggle}>
        {isOpen ? <CloseIcon width="48px" color="white"/> : <Image src ={Menu} width="32px" m="2" style={{filter: "invert(100%) sepia(0%) saturate(7500%) hue-rotate(164deg) brightness(97%) contrast(109%)"}}/>}
    </Box>
  )
}

export default MenuToggle