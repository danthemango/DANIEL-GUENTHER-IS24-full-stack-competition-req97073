import { useState } from 'react';
import { NavLink, Form, useLoaderData, useFetcher, useNavigate, useLocation } from "react-router-dom";
import { getProduct, updateProduct, createProduct } from "./product";
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
  InputRightElement,
  InputRightAddon,
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
  Image,
  FormErrorMessage
} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import DatePicker from 'react-date-picker';
import {deleteProduct} from './product';

// export async function action({ request, params }) {
//     await updateProduct(params.productId);
//     return redirect('/product')
// }

export async function editLoader({ params }) {
  const product = await getProduct(params.productId);
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { product };
}

// returns a brand new product object
export async function createLoader({ params }) {
  const product = {
    "productName": "",
    "productOwnerName": "",
    "Developers": [ '' ],
    "scrumMasterName": "",
    "startDate": "",
    "methodology": ""
  };
  return { product };
}

/** Component to display a label and text input field on one line */
function OnelineInput({ label, value, onChange, defaultValue, isStatic, isRequired }) {
  return (
    <FormControl mb="20px" isRequired={isRequired} isInvalid={!value}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex direction="row" w={{ md: "25%" }} alignItems="center">
          <FormLabel m="0" h="70%">{label}</FormLabel>
        </Flex>
        <Box w={{ base: '100%', md: '75%' }} flexGrow={1} >
          {isStatic ?
            <Text m="0" my={{ md: "8px" }} ml="17px" w="100%">{value}</Text>
            :
            <Input m="0" w="100%" defaultValue={defaultValue} value={value} onChange={e => onChange(e.target.value)}></Input>
          }
        </Box>
      </Stack>
      <FormErrorMessage>field required</FormErrorMessage>
    </FormControl>
  )
}

/** returns true if the date is in a valid YYYY/MM/DD format */
function isValidDate(dateString) {
  return /\d{4}\/\d{1,2}\/\d{1,2}/.test(dateString);
}

/** Product date picker component, converts to YYYY/MM/DD string as needed */
function ProductDatePicker({label, isRequired, value: initDate, onChange}) {

  // turn date into YYYY/MM/DD formatted string
  function toString(thedate) {
    if(!thedate) {
      return '';
    }
    const padNum = val => val.toString().padStart(2, '0');
    const dateString = `${thedate.getFullYear()}/${padNum(thedate.getMonth()+1)}/${padNum(thedate.getDate())}`;
    return dateString;
  }

  // turn YYYY/MM/DD formatted string into date, null if incorrect format
  function toDate(dateString) {
    // note: using https://regexr.com/ to test
    if(!isValidDate(dateString)) {
      return null;
    } else {
      const [y,m,d] = dateString.split('/');
      return new Date(y,m-1,d);
    }
  }

  const [dateVal, setDateVal] = useState(toDate(initDate));

  // runs onChange with a properly formatted date string,
  // and updating internal date for the calendar picker
  function onDatePickerChange(newDate) {
    setDateVal(newDate);
    const newDateString = toString(newDate)
    onChange(newDateString);
  }

  return (
    <FormControl mb="20px" isRequired={isRequired} isInvalid={!dateVal}>
      <Stack direction={{ base: 'column', md: 'row' }}>
        <Flex direction="row" w={{ md: "25%" }} alignItems="center">
          <FormLabel m="0" h="70%">{label}</FormLabel>
        </Flex>
        <Box w={{ base: '100%', md: '75%' }} flexGrow={1} >
          <DatePicker value={dateVal} onChange={onDatePickerChange} />
        </Box>
      </Stack>
      <FormErrorMessage>Field required</FormErrorMessage>
    </FormControl>
  );
}

/** returns true if the product is ready for submission */
function isValidProduct(product) {
  if(!product) {
    return false;
  } 

  const requiredKeys = ["productName", "productOwnerName", "Developers", "scrumMasterName", "startDate", "methodology" ];
  for(let key of requiredKeys) {
    if(!product[key]) {
      return false;
    }
  }

  if(product.Developers.length == 0 || product.Developers.some(developer => !developer)) {
    return false;
  }

  return true;
}

/** page to modify a product contents */
export default function ProductEditPage() {
  const navigate = useNavigate();
  const { product: initProduct } = useLoaderData();
  const [ product, setProduct] = useState(initProduct);
  // const [submitAttempted, setSubmitAttempted] = useState(false);

  /** 
   * returns the onProductChange function for a given key of product
   * which updates the product for a given key
  */
  function getOnChangeForProductKey(key) {
    return function onProductChange(value) {
      setProduct(prevProduct => ({
        ...prevProduct,
        [key]: value,
      }))
    }
  }

  /** return onChange function for a given developer index */
  function getOnDeveloperChangeForIdx(idx) {
    return function onDeveloperChange(newDeveloper) {
      const newDevelopers = product.Developers;
      newDevelopers[idx] = newDeveloper;
      getOnChangeForProductKey('Developers')(newDevelopers);
    }
  }

  /** removes a developer at a given index */
  function removeDeveloper(idx) {
    if(!product.Developers || !product.Developers.length || product.Developers.length <= idx) {
      alert(`Error: could not remove developer ${idx}`);
      return;
    }
    product.Developers.splice(idx, 1);
    getOnChangeForProductKey('Developers')([...product.Developers]);
  }

  function addDeveloper() {
    product.Developers.push('');
    getOnChangeForProductKey('Developers')([...product.Developers]);
  }

  // send delete request
  async function handleDelete() {
    if(!confirm('please confirm you want to delete this product')) {
      return;
    }

    try {
      await deleteProduct(product.productId);
      return navigate('/product');
    } catch (e) {
      console.error(e);
      alert('Something went wrong.');
    }
  }

  // save product
  async function handleSave() {
    try {
      await updateProduct(product.productId, product);
      return navigate('/product');
    } catch (e) {
      console.error(e);
      alert('Something went wrong.');
    }
  }

  // create new product
  async function handleCreate() {
    try {
      await createProduct(product);
      return navigate('/product');
    } catch (e) {
      console.error(e);
      alert('Something went wrong.');
    }
  }

  return (
    <Center bg="gray.200">
      <Box w={{ base: '100%', md: "1200px" }} p="40px" border="1px" borderRadius="10px" m={{base: '0', md: '20px'}} bg="white" borderColor="gray.400" >
        <Form>
          {product.productId && <OnelineInput label="Product ID:" value={product.productId} isStatic />}
          <OnelineInput label="Product Name:" value={product.productName} onChange={getOnChangeForProductKey('productName')} isRequired />
          <OnelineInput label="Product Owner:" value={product.productOwnerName} onChange={getOnChangeForProductKey('productOwnerName')} isRequired />

          <FormControl isRequired mb="20px">
            <FormLabel>Developers:</FormLabel>
            <FormHelperText>(Maximum of 5 Developers)</FormHelperText>
            <VStack justify='left'>
              {product.Developers.map((developer, idx) => (
                <FormControl key={idx} isRequired isInvalid={!developer}>
                  <InputGroup size='md'>
                    <VStack>
                      <Flex>
                        <Input w="50" mb="5px" type="text" value={developer} onChange={e => getOnDeveloperChangeForIdx(idx)(e.target.value)}></Input>
                        <InputRightAddon p="0">
                          <Tooltip label="At least 1 developer" isDisabled={product.Developers.length > 1}>
                            <Button colorScheme="red" size='sm' h="100%" onClick={() => removeDeveloper(idx)} isDisabled={product.Developers.length <= 1}>
                              <CloseIcon />
                            </Button>
                          </Tooltip>
                        </InputRightAddon>
                      </Flex>
                      <FormErrorMessage w="100%">field required</FormErrorMessage>
                    </VStack>
                  </InputGroup>
                </FormControl>
              ))}
              <Box w="100%">
                <Tooltip label="Max 5 Developers" isDisabled={product.Developers.length < 5}>
                  <Button colorScheme="blue" isDisabled={product.Developers.length >= 5} onClick={addDeveloper}>+ Add Developer</Button>
                </Tooltip>
              </Box>
            </VStack>
          </FormControl>

          <OnelineInput label="Scrum Master:" value={product.scrumMasterName} onChange={getOnChangeForProductKey('scrumMasterName')} isRequired />

          <ProductDatePicker label="Start Date:" value={product.startDate} onChange={getOnChangeForProductKey('startDate')} isRequired />

          <FormControl isRequired pb="">
            <FormLabel>Methodology:</FormLabel>
            <RadioGroup value={product.methodology} onChange={getOnChangeForProductKey('methodology')}>
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
            <Button colorScheme="blue" isDisabled={!isValidProduct(product)} onClick={product.productId ? handleSave : handleCreate}>Save</Button>
            <Button onClick={() => navigate('/product')}>Cancel</Button>
            <Spacer />
            <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
          </HStack>
        </Form>
      </Box>
    </Center>
  )
}
