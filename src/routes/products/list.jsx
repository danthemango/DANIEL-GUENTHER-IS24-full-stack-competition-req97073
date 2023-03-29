import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

import {
    getProducts
} from '../../products';
import { useState} from 'react';
import { useLoaderData } from "react-router-dom";

import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'

// export async function action({request, params}) {
//     let formData = await request.formData();
//     return updateContact(params.contactId, {
//         favorite: formData.get("favorite") == "true",
//     });
// }

export async function loader({params}) {
    const products = await getProducts();
    // if(!product) {
    //     throw new Response("", {
    //         status: 404,
    //         statusText: "Not Found",
    //     });
    // }
    return { products };
}


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
 * table header which shows an arrow if it is sorted
 */
function ThSortable({children, isSorted, onClick, direction}) {
    return <Th onClick={onClick}>{children} {isSorted && <SortIcon direction={direction}/>}</Th>
}

export default function ProductsTablePage() {
    const {products} = useLoaderData();

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
                                <Td>{product.developers}</Td>
                                <Td>{product.scrumMasterName}</Td>
                                <Td>{product.startDate}</Td>
                                <Td>{product.methodology}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}