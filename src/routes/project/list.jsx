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

// 
/**
 * a simple arrow if direction is 'up' or 'down'
 */
function SortIcon({direction}) {
    if(direction == 'up') {
        return <ArrowUpIcon />
    } else if(direction == 'down') {
        return <ArrowDownIcon />
    } else {
        return <></>
    }
}

/**
 * sortable table header
 */
function ThSortable({children, isSorted, onClick, direction}) {
    return <Th onClick={onClick}>{children} {isSorted && <SortIcon direction={direction}/>}</Th>
}

function ProjectTable() {
    const [direction, setDirection] = useState('');
    const [sortBy, setSortBy] = useState('productName');
    function sortColumn(key) {
        setDirection(direction == 'down' ? 'up' : 'down');
        setSortBy(key);
        console.log('sorting column ...') //
    }

    const headings = [
        { label: 'Product ID', key: 'productId' },
        { label: 'Product Name', key: 'productName' },
        { label: 'Product Owner', key: 'productOwnerName' },
        { label: 'Developers', key: 'Developers' },
        { label: 'Scrum Master', key: 'scrumMasterName' },
        { label: 'Start Date', key: 'startDate' },
        { label: 'Methodology', key: 'methodology' },
    ];

    return (
        <TableContainer>
            <Table>
                <Thead style={{userSelect: 'none'}}>
                <Tr>
                    {headings.map(heading => {
                        return (
                            <ThSortable
                                key={heading.key}
                                onClick={() => sortColumn(heading.key)}
                                direction={direction}
                                isSorted={sortBy == heading.key}>
                                    {heading.label}
                            </ThSortable>
                        )
                    })}
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