import { Box, Button, Container, Divider, Grid, Progress, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SubscriptionItem from './SubscriptionItem';
import woodImage from '../../res/img/wood2.png'
import { Parallax, Background } from "react-parallax";
import PaymentPage from './PaymentPage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubscriptionAsync } from '../../redux/subscriptions/thunks';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
    const { subscription, successfulCreation } = useSelector(state => state.subscription)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [type, setType] = useState("");

    const [isUpgradeChecked, setIsUpgradeChecked] = useState(false)
    const [price, setPrice] = useState();
    const [display, setDisplay] = useState("none");

    const prices = [100, 200, 500, 1000]
    const navigate = useNavigate();

    const SelectSubscription = (subscriptionType, subscirptionPrice) => {
        console.log(subscriptionType)
        setType(subscriptionType)
        setPrice(subscirptionPrice)
        setDisplay("block")
    }

    useEffect(() => {
        if (subscription) {
            setPrice(subscription.Price)
            setType(subscription.Type)
            setDisplay('none')
        }
    }, [subscription])

    useEffect(() => {
        if(successfulCreation) {
            setIsUpgradeChecked(false)
        }
    }, [successfulCreation])

    const onClickUpgradeButton = () => {
        setIsUpgradeChecked(true);
    }

    const onClickDeleteButton = () => {
        dispatch(deleteSubscriptionAsync({Id: user.id}));
    }

    return (
        <>{(subscription === undefined || isUpgradeChecked === true) ? <><Box>
                <Text fontSize="3rem" p={8} fontWeight="bold" color="#1C4532" textAlign="center">Choose the best subscription depending on your needs!</Text>
                <Container maxW="container.xl">
                    <Grid templateColumns={{ base: "none", md: "50% 50%", lg: "25% 25% 25% 25%" }}>
                        <SubscriptionItem onClickBtn={SelectSubscription} Type="Bronze" Price={prices[0]} FirstLine="Up to 100 furniture models" SecondLine="Low support priority" ThirdLine="Cheap" />
                        <SubscriptionItem onClickBtn={SelectSubscription} Type="Silver" Price={prices[1]} FirstLine="Up to 350 furniture models" SecondLine="Medium support priority" ThirdLine="Good value" />
                        <SubscriptionItem onClickBtn={SelectSubscription} Type="Gold" Price={prices[2]} FirstLine="Up to 1200 furniture models" SecondLine="High support priority" ThirdLine="Most popular!" />
                        <SubscriptionItem onClickBtn={SelectSubscription} Type="Platinum" Price={prices[3]} FirstLine="Up to 2000 furniture models" SecondLine="No queue for support" ThirdLine="Best value" />
                    </Grid>
                    <div style={{ display: display }}>
                        <PaymentPage Price={price} Type={type} />
                    </div>
                </Container>
            </Box></> : <><Box>
                <Text fontSize="3rem" p={8} fontWeight="bold" color="#1C4532" textAlign="center">Your subscription:</Text>
                <Container maxW="container.xl" mb={8}>
                    <Box backgroundColor="whiteAlpha.600" borderRadius="5px" textAlign="center" p={8}>
                        <Text color="blackAlpha.800" fontSize="2rem">Tier: {subscription.type}</Text>
                        <Divider color="blackAlpha.800" />
                        <Text color="blackAlpha.800" fontSize="1.5rem">Max capacity: {subscription.furnitureCap}</Text>
                        <Text color="blackAlpha.800" fontSize="1.5rem">Price: RON {subscription.price} per month.</Text>
                        <Text color="blackAlpha.800" fontSize="1.5rem">Remaining furniture slots: {subscription.furnitureCap - subscription.occupiedCap}</Text>
                        <Progress colorScheme="teal" value={(subscription.furnitureCap - subscription.occupiedCap) / subscription.furnitureCap * 100} hasStripe="true" />
                        <Button colorScheme="teal" m={4} onClick={onClickUpgradeButton}>Change subscription type</Button>
                        <Button colorScheme="green" m={4} onClick={onClickDeleteButton}>End subscription</Button>
                        <Button colorScheme="blue" m = {4} onClick = {() => {navigate('/addFurniture')}}>Add furniture</Button>
                        <Text color="green" fontSize="1rem">Status: ACTIVE</Text>
                    </Box>
                    <div style={{ display: display }}>
                        <PaymentPage Price={price} Type={type} />
                    </div>
                </Container>
            </Box></>}

        </>
    )
}

export default SubscriptionPage