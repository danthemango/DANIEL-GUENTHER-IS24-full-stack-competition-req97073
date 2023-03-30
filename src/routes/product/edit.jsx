import { NavLink, Form, useLoaderData, useFetcher, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "./product";
import {
  Divider,
  Center,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  FormHelperText,
  Text,
  Radio,
  RadioGroup,
  HStack,
  Spacer,
  Image
} from '@chakra-ui/react';
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from 'react-icons/bs';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateProduct(params.productId, {
    favorite: formData.get("favorite") == "true",
  });
}

export async function loader({ params }) {
  const product = await getProduct(params.productId);
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { product };
}

/** Component to display a label and text input field on one line */
function OnelineInput({ label, defaultValue, isStatic, isRequired }) {
  return (
    <FormControl mb="20px" isRequired={isRequired}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex direction="row" w={{ md: "25%" }} alignItems="center">
          <FormLabel m="0" h="70%">{label}</FormLabel>
        </Flex>
        <Box w={{ base: '100%', md: '75%' }} flexGrow={1} >
          {isStatic ?
            <Text m="0" my={{ md: "8px" }} ml="17px" w="100%">{defaultValue}</Text>
            :
            <Input m="0" w="100%" defaultValue={defaultValue}></Input>
          }
        </Box>
      </Stack>
    </FormControl>
  )
}

/** page to modify a product contents */
export default function ProductEditPage() {

  const { product } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Center bg="gray.200">
      <Box w={{ base: '100%', md: "1200px" }} p="40px" border="1px" borderRadius="10px" m={{base: '0', md: '20px'}} bg="white" borderColor="gray.400" >
        <Form>
          <OnelineInput label="Product ID:" defaultValue={product.productId} isStatic />
          <OnelineInput label="Product Name:" defaultValue={product.productName} isRequired />
          <OnelineInput label="Product Owner:" defaultValue={product.productOwnerName} isRequired />

          <FormControl isRequired mb="20px">
            <FormLabel>Developers:</FormLabel>
            <FormHelperText>(Maximum of 5 developers)</FormHelperText>
            <VStack>
              {product.developers.map((developerName, idx) => (
                <Input w="50" key={idx} mb="5px" type="text" defaultValue={developerName}></Input>
              ))}
              <Tooltip label="Max 5 developers" isDisabled={product.developers.length < 5}>
                <Button colorScheme="blue" isDisabled={product.developers.length >= 5}>+ Add Developer</Button>
              </Tooltip>
            </VStack>
          </FormControl>

          <OnelineInput label="Scrum Master:" defaultValue={product.scrumMasterName} isRequired />
          <OnelineInput label="Start Date:" defaultValue={product.startDate} isRequired />
          <FormControl isRequired>
            <FormLabel>Methodology:</FormLabel>
            <RadioGroup defaultValue={product.methodology}>
              <Stack spacing={5} direction='row'>
                <Radio colorScheme='blue' value='Agile'>
                  Agile
                </Radio>
                <Radio colorScheme='blue' value='Waterfall'>
                  Waterfall
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Divider my="10px" />
          <HStack pt="10px">
            <Button colorScheme="blue">Save</Button>
            <Button onClick={() => navigate('/product')}>Cancel</Button>
          </HStack>
        </Form>
      </Box>
    </Center>
  )
}
