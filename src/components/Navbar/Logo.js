import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import logo from '../../res/logo.svg'

const Logo = () => {
  return (
    <Box>
        <Image src={logo} alt="logo" maxWidth={{base: "150px",sm:"200px", md:'300px'}} style={{filter: "invert(100%) sepia(0%) saturate(7500%) hue-rotate(164deg) brightness(97%) contrast(109%)"}}/>
    </Box>
  )
}

export default Logo