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
} from './product';
import { useState, useMemo } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";

import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'

export async function loader({params}) {
    const products = await getProducts();
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

/** unsorted list to display developers */
function DeveloperList({developers}) {
    if(!developers || !developers.length) return <ul></ul>;

    return (
        <ul>
            {developers.map((name, idx) => (
                <li key={idx}>{name}</li>
            ))}
        </ul>
    )
}

/** manage sorting on table */
function useSortable(items, config = null) {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = items;
        if(sortConfig != null) {
            if(sortConfig.direction == 'down') {
                sortableItems.sort((a,b) => a[sortConfig.key].localeCompare(b[sortConfig.key]));
            } else {
                sortableItems.sort((a,b) => b[sortConfig.key].localeCompare(a[sortConfig.key]));
            }
        }
        return sortableItems;
    }, [items, sortConfig]);

    function sortColumn(key) {
        let direction = 'up';
        if(sortConfig && sortConfig.key == key && sortConfig.direction == 'up') {
            direction = 'down';
        }
        
        setSortConfig({key, direction});
    }

    return { items: sortedItems, sortColumn, sortConfig };
}

/**
 * table header which shows an arrow if it is sorted
 */
function ThSortable({children, isSorted, onClick, direction, isSortable}) {
    return (
        <Th
            onClick={onClick}
            style={{userSelect: 'none'}}
            _hover={isSortable && { bg: 'blue.400', color: 'white' }}

            cursor={isSortable ? "pointer" : "default"}
        >
                {children} {isSorted && <SortIcon direction={direction} />}
        </Th>
    )
}

export default function ProductsTablePage() {
    const {products} = useLoaderData();
    const {items, sortColumn, sortConfig} = useSortable(products);
    const navigate = useNavigate();

    const headings = [
        { label: 'Product ID', key: 'productId', sortable: true },
        { label: 'Product Name', key: 'productName', sortable: true },
        { label: 'Product Owner', key: 'productOwnerName', sortable: true },
        { label: 'Developers', key: 'Developers', sortable: false },
        { label: 'Scrum Master', key: 'scrumMasterName', sortable: true },
        { label: 'Start Date', key: 'startDate', sortable: true },
        { label: 'Methodology', key: 'methodology', sortable: true },
    ];

    return (
        <TableContainer mt="15px" className={NavigationPreloadManager.state === 'loading' ? 'loading' : ''}>
            <Table>
                <Thead>
                <Tr>
                    {headings.map(heading => {
                        return (
                            <ThSortable
                                key={heading.key}
                                onClick={() => heading.sortable && sortColumn(heading.key)}
                                direction={sortConfig && sortConfig.direction}
                                isSorted={heading.sortable && sortConfig && sortConfig.key == heading.key}
                                isSortable={heading.sortable}>
                                    {heading.label}
                            </ThSortable>
                        )
                    })}
                </Tr>
                </Thead>
                <Tbody>
                    {
                        items.map(product => (
                            <Tr
                                onClick={() => navigate(`/product/${product.productId}/edit`)}
                                key={product.productId}
                                _hover={{
                                    bg: 'blue.400',
                                    color: 'white',
                                }}
                                cursor="pointer"
                            >
                                <Td>{product.productId}</Td>
                                <Td>{product.productName}</Td>
                                <Td>{product.productOwnerName}</Td>
                                <Td>
                                    <DeveloperList developers={product.developers} />
                                </Td>
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