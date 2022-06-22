import { Box, Grid, GridItem, Heading, Link, Text, Flex } from '@chakra-ui/react';

function Footer() {
    return (
        <Box minHeight="50vh" backgroundColor="#1C4532" color="white" width="100%" pt={8} textAlign="center">
            <Flex direction={{base:"column", md:"row"}} textAlign="center">
                <Grid templateRows="repeat(4, 0.5fr)" width="100%">
                    <GridItem> <Heading mb={4}>About us</Heading></GridItem>
                    <GridItem><Link href="/about/company">Our Company</Link></GridItem>
                    <GridItem> <Link href="/about/mission">Our mission</Link></GridItem>
                    <GridItem><Link href="/about/products">Our products</Link></GridItem>
                </Grid>
                <Grid templateRows="repeat(4, 0.5fr)" width="100%">
                    <GridItem> <Heading mb={4}>For businesses</Heading></GridItem>
                    <GridItem><Link href="/business/subscriptions">Subscriptions</Link></GridItem>
                    <GridItem> <Link href="/business/tos">Terms and conditions</Link></GridItem>
                </Grid>
                <Grid templateRows="repeat(4, 0.5fr)" width="100%">
                    <GridItem> <Heading mb={4}>Our impact</Heading></GridItem>
                    <GridItem><Link href="/impact/together">Bringing small businesses together</Link></GridItem>
                    <GridItem> <Link href="/impact/costs">Minimising costs</Link></GridItem>
                </Grid>
                
                </Flex>
                <Grid templateColumns="auto" mt={60}>
                    <GridItem>  <Text fontWeight="bold">© 2022 Copyright Teodor Sova.</Text> <Link href="/privacy">Privacy</Link> <Link href="/cookies">Cookies</Link></GridItem>
                </Grid>
        </Box>
    )
}

export default Footer;