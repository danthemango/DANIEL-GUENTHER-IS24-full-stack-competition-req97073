import { Link, Stack, Center, Divider, Text, Box, Flex, HStack, Heading, Button, Spacer} from "@chakra-ui/react";
import {NavLink} from 'react-router-dom';

export default function Navbar() {
    return (
        <Stack spacing="0">
            <Flex color="white" bg="#003366" as="nav" p="10px" alignItems="center" gap="10px" borderBottom="solid #fcba19 2px">
                <HStack spacing="20px">
                    <Heading as="h1">The Product Manager</Heading>
                </HStack>
                <Spacer />
                <HStack spacing="20px">
                    <Divider height="80px" orientation='vertical' />
                    <Text fontWeight="bold" fontFamily="serif">Information<br />Management<br />Branch</Text>
                </HStack>
            </Flex>
            <Flex color="white" bg="#38598a" p="10px" alignItems="center" gap="10px">
                <NavLink to="/">Home</NavLink>
                <Text>-</Text>
                <NavLink to="/product">Product List</NavLink>
            </Flex>
        </Stack>
    )
}