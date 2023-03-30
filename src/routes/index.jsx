import {Center, Button, Link} from '@chakra-ui/react';
import {NavLink} from 'react-router-dom';

export default function Index() {
    return (
      <Center p="100px" > <NavLink to="/product"> <Button>go to Products List</Button> </NavLink> </Center>
    );
  }