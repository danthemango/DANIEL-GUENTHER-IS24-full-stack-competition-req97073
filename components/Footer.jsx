import { Link, Stack, Center, Divider, Text, Box, Flex, HStack, Heading, Button, Spacer} from "@chakra-ui/react";

export default function Footer() {
    const linkStyle = {
        color: '#a8a8a8',
        textDecoration: 'underline',
        ':hover': {
            color: 'white',
            textDecoration: 'underline',
        }
    }

    return (
        <Stack spacing="0">
            <Flex color="white" bg="#003366" justify="center">
                <Flex maxWidth="1200px" w="100%" px="10px" py="30px" alignItems="center" gap="10px">
                    <Text>
                        © 2023 &nbsp; 
                        <Link className='navbar-link' href="https://www.linkedin.com/in/danthemango">Daniel Guenther</Link>
                    </Text>
                </Flex>
            </Flex>
        </Stack>
    )
}
