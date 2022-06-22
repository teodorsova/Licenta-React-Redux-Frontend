import { Text, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProcessingPaymentPage = () => {

    const [text, setText] = useState("Processing payment")

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/subscription`;
        navigate(path);
    }

    const displayTextAsync = () => {
        setText(text + ".");
    }
    useEffect(() => {
        var i = 0;
        while (i < 8) {
            setTimeout(displayTextAsync(), 500);
            setTimeout(() => {i++}, 500);
        }
        routeChange();
    })


    return (
        <>
            <Container maxW="container.md" p={{ base: "0", md: "16" }} h="60vh">
                <Text textAlign="center" fontSize="2rem">
                    {text}
                </Text>
            </Container>
        </>
    )
}

export default ProcessingPaymentPage