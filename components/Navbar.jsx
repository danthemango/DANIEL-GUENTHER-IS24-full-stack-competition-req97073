import { Spinner, Link, Stack, Center, Divider, Text, Box, Flex, HStack, Heading, Button, Spacer} from "@chakra-ui/react";
import {NavLink, useNavigation} from 'react-router-dom';

/** for the top of the page */
export default function Navbar() {
    const navigation = useNavigation();
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}></div>

    return (
        <Stack spacing="0">
            <Flex as="nav" color="white" bg="#003366" justify="center" borderBottom="solid #fcba19 2px">
                <Flex maxWidth="1200px" w="100%" p='10px' alignItems="center" gap="10px">
                    <Box spacing="20px">
                        <Heading as="h1">The Product Manager</Heading>
                    </Box>
                    <Box>
                        <Center>
                            {
                                navigation.state === "loading" &&
                                <Spinner thickness='4px' speed='0.65s' emptyColor='white' color='blue.500' size='lg' /> 
                            }
                        </Center>
                    </Box>
                    <Spacer />
                    <HStack spacing="20px">
                        <Divider height="80px" orientation='vertical' />
                        <Text fontWeight="bold" fontFamily="serif">Information<br />Management<br />Branch</Text>
                    </HStack>
                </Flex>
            </Flex>
            <Flex color="white" bg="#38598a" justify="center">
                <Flex maxWidth="1200px" w="100%" p="10px" alignItems="center" gap="10px">
                    <NavLink to="/" className='navbar-link' >Home</NavLink>
                    <Text>-</Text>
                    <NavLink to="/product" className='navbar-link' >Product List</NavLink>
                </Flex>
            </Flex>
        </Stack>
    )
}