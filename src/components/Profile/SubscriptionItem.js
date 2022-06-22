import React, { useState } from 'react'
import { GridItem, Text, Divider, Box, Button } from '@chakra-ui/react'

const SubscriptionItem = (props) => {
    

    function handleOnMouseEnter(e) {
            e.currentTarget.style.background = "RGBA(255, 255, 255, 0.92)"
    }

    function handleOnMouseLeave(e) {
            e.currentTarget.style.background = "RGBA(255, 255, 255, 0.48)"
    }

    return (
        <>
            <GridItem p={4} backgroundColor="whiteAlpha.600" borderRadius="5px" m={4} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                <Text fontSize="1.3rem" color="blackAlpha.600">{props.Type}</Text>
                <Text color="blackAlpha.800" fontSize="2rem">RON {props.Price}</Text>
                <Divider color="blackAlpha.500" mb={8} mt={8}/>
                <Text color="blackAlpha.600" fontSize="1.1rem">•{props.FirstLine}</Text>
                <Text color="blackAlpha.600" fontSize="1.1rem">•{props.SecondLine}</Text>
                <Text color="blackAlpha.600" fontSize="1.1rem">•{props.ThirdLine}</Text>
                <Box textAlign="center" m={{base:"0", md:"8"}}>
                    <Button color="whiteAlpha.900" p={{base:"0", md:"8"}} width="100%" onClick={() => {props.onClickBtn(props.Type, props.Price)}}><Text fontSize="1.3rem" color = "blackAlpha.800">Get plan</Text></Button>
                </Box>
            </GridItem>
        </>
    )
}

export default SubscriptionItem