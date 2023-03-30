import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getProduct, updateProduct } from "./product";
import {Flex, Box, Text, Heading, Center, Input } from '@chakra-ui/react';

export async function action({request, params}) {
    let formData = await request.formData();
    return updateProduct(params.productId, {
        favorite: formData.get("favorite") == "true",
    });
}

export async function loader({params}) {
    const product = await getProduct(params.productId);
    if(!product) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { product };
}

export default function Product() {
  const { product } = useLoaderData();

  return (
    <Center>
      <Box>
        <Input value={product.productName}></Input>

      </Box>

      <Flex flexWrap="wrap" alignItems="center" justifyContent="center" maxW="800px" mt="10">
      <Box as="a" href="https://nextjs.org/docs" p="6" m="4" borderWidth="1px" rounded="lg" flexBasis="45%">
        <Heading as="h3" size="lg" mb="2">Documentation &rarr;</Heading>
        <Text fontSize="lg">Find in-depth information about Next.js features and API.</Text>
      </Box>

      <Box as="a" href="https://nextjs.org/learn" p="6" m="4" borderWidth="1px" rounded="lg" flexBasis="45%">
        <Heading as="h3" size="lg" mb="2">Learn &rarr;</Heading>
        <Text fontSize="lg">Learn about Next.js in an interactive course with quizzes!</Text>
      </Box>

      <Box as="a" href="https://github.com/vercel/next.js/tree/master/examples" p="6" m="4" borderWidth="1px" rounded="lg" flexBasis="45%">
        <Heading as="h3" size="lg" mb="2">Examples &rarr;</Heading>
        <Text fontSize="lg">Discover and deploy boilerplate example Next.js projects.</Text>
      </Box>

      <Box as="a" href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" p="6" m="4" borderWidth="1px" rounded="lg" flexBasis="45%">
        <Heading as="h3" size="lg" mb="2">Deploy &rarr;</Heading>
        <Text fontSize="lg">Instantly deploy your Next.js site to a public URL with Vercel.</Text>
      </Box>

      <Box as="a" href="https://chakra-ui.com/" p="6" m="4" borderWidth="1px" rounded="lg" flexBasis="45%">
        <Heading as="h3" size="lg" mb="2">Chakra UI &rarr;</Heading>
        <Text fontSize="lg">Build accessible React apps & websites with speed.</Text>
      </Box>
      </Flex>
    </Center>
  )
}

function Product2() {
  const {product} = useLoaderData();

  return (
    <div id="product">
      <div>
        <img
          key={product.avatar}
          src={product.avatar || null}
        />
      </div>

      <div>
        <h1>
          {product.first || product.last ? (
            <>
              {product.first} {product.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite product={product} />
        </h1>

        {product.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${product.twitter}`}
            >
              {product.twitter}
            </a>
          </p>
        )}

        {product.notes && <p>{product.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ product }) {
  // yes, this is a `let` for later
  let favorite = product.favorite;
  const fetcher = useFetcher();
  if(fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
