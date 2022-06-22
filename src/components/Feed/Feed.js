import { Box, Button, Container, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import './Feed.css'
import furnitureImage from '../../res/img/furnitureHome.png'
import woodImage from '../../res/img/wood2.png'
import furniture1 from '../../res/img/furniture1.jpeg'
import furniture2 from '../../res/img/furniture2.jpeg'
import { Parallax, Background } from 'react-parallax';

function Feed() {
    return (
        <>
            <Box minHeight="50vh" backgroundColor="#1C4532" pr={{ base: 8, '2xl': 300 }}
                pl={{ base: 8, '2xl': 300 }}>
                <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: '45% 30% 25%' }} pb={8} pt={8}>
                    <GridItem>
                        <Text fontSize="2.8rem" fontWeight="bolder" color="#d1d1d1" mb={4}>
                            Welcome to the best 3D furniture platform!
                        </Text>
                        <Text>
                            We offer customers the option to configure their 3D rooms using furniture from multiple companies at once!
                        </Text>
                        <Button mt={8}>
                            Sign up
                        </Button>
                    </GridItem>
                    <GridItem >

                    </GridItem>
                    <GridItem display={{ base: 'none', md: 'block' }} p={3}>
                        <Image src={furnitureImage} width="250px" alt="sofa" filter="invert(58%) sepia(97%) saturate(0%) hue-rotate(114deg) brightness(96%) contrast(95%);" />
                    </GridItem>

                </Grid>
            </Box>
                <Box pr={{ base: 8, '2xl': 300 }} pl={{ base: 8, '2xl': 300 }}>

                    <Grid pb={8}
                        pt={8}
                        templateRows='repeat(2, 1fr)'
                        templateColumns={{ md: '40% 10% 40%' }} >
                        <GridItem>
                            <Text fontSize="2rem" color="#1C4532" fontWeight="bold">
                                A platform that connects all small businesses
                            </Text>
                            <Text fontSize="1.5rem" color="#1C4532">
                                If you own a funriture company, you can list your products in our catalogue, rather than building your own tool from scratch! Then, customers will be able to see your products!
                            </Text>
                            <Button mt={8} color="#d1d1d1" backgroundColor="#1C4532">
                                Explore
                            </Button>
                        </GridItem>
                        <GridItem display={{ base: 'none', md: 'block' }}></GridItem>
                        <GridItem p={3}>
                            <Image src={furniture1} alt="sofa" border="5px solid #d1d1d1" borderRadius="20px" />
                        </GridItem>

                        <GridItem p={3}>
                            <Image src={furniture2} alt="sofa" border="5px solid #d1d1d1" borderRadius="20px"/>
                        </GridItem>
                        <GridItem display={{ base: 'none', md: 'block' }}></GridItem>
                        <GridItem>
                            <Text fontSize="2rem" color="#1C4532" fontWeight="bold">
                                Explore 3D models as a customer!
                            </Text>
                            <Text fontSize="1.5rem" color="#1C4532">
                                    Our high quality tool provides the most immersive experience in terms of creating a virtual room!
                                    Choose between the wide variety offered by our partners and create your perfect room, or even an entire home!
                            </Text>
                            <Button mt={8} color="#d1d1d1" backgroundColor="#1C4532">
                                View 3D catalogue
                            </Button>
                        </GridItem>
                        
                        
                    </Grid>
                </Box>
                
        </>
    )
}

export default Feed;