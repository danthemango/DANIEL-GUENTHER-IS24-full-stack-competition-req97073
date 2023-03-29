import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

import { useState } from 'react';

import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'

const products = [
    {
        productId: "5",
        productName: "Elephant",
        productOwnerName: "Johnny Rogers",
        Developers: "Frank, Phil, Eric",
        scrumMasterName: "Frank",
        startDate: "2016-07-09",
        methodology: "Agile",
    },
    {
        productId: "6",
        productName: "Franky's Nest",
        productOwnerName: "Elvis Presley",
        Developers: "George, Franklyn, Rogers",
        scrumMasterName: "Rogers",
        startDate: "2019-08-12",
        methodology: "Waterfall",
    }
]

// creates a simple arrow if direction is 'up' or 'down'
function SortIcon({direction}) {
    // <span> {direction && ArrowDownIcon} </span>
    if(direction == 'up') {
        return <ArrowUpIcon />
    } else if(direction == 'down') {
        return <ArrowDownIcon />
    } else {
        return <></>
    }
}

function ProjectTable() {
    const [sort, setSort] = useState({});

    // sorts the array
    function sortBy(id) {
        if(!sort[id] || sort[id] == 'up') {
            sort[id] = 'down';
        } else {
            sort[id] = 'up';
        }
        setSort(sort);
    }

    return (
        <TableContainer>
            <Table>
                <Thead style={{userSelect: 'none'}}>
                <Tr>
                    <Th>{Object.keys(sort)}</Th>
                    <Th onClick={e => sortBy('productId')}>Product ID <SortIcon direction={sort.productId}/></Th>
                    <Th>Product Name</Th>
                    <Th>Product Owner</Th>
                    <Th>Developers</Th>
                    <Th>Scrum Master</Th>
                    <Th>Start Date</Th>
                    <Th>Methodology</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        products.map(product => (
                            <Tr key={product.productId}>
                                <Td>{product.productId}</Td>
                                <Td>{product.productName}</Td>
                                <Td>{product.productOwnerName}</Td>
                                <Td>{product.Developers}</Td>
                                <Td>{product.scrumMasterName}</Td>
                                <Td>{product.starTd}</Td>
                                <Td>{product.methodology}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default function ProjectTablePage() {
    return (
        <>
            <ProjectTable />
        </>
    )
}