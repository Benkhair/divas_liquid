import Client from 'shopify-buy'

const domain = 'divas-care-llc.myshopify.com'
const storefrontAccessToken = '20fda8b896498db96559dfad176ac79c'

const client = Client.buildClient({
  domain,
  storefrontAccessToken,
})

// Shopify variant IDs for each product (gid format required by SDK)
export const VARIANT_IDS = {
  // Books
  'surgeons-list': 'gid://shopify/ProductVariant/46691921723562',
  'black-book': 'gid://shopify/ProductVariant/46693855330474',
  // Shop products
  'bbl-gummy': 'gid://shopify/ProductVariant/43308253577386',
  'back-compression': 'gid://shopify/ProductVariant/46964222689450',
  'chin-foam-3pk': 'gid://shopify/ProductVariant/46964221411498',
  'lipo-foam': 'gid://shopify/ProductVariant/46964143292586',
  'front-compression': 'gid://shopify/ProductVariant/46964141588650',
  'chin-strap': 'gid://shopify/ProductVariant/46960422944938',
}

let checkoutInstance = null

async function getCheckout() {
  if (checkoutInstance) {
    try {
      const refreshed = await client.checkout.fetch(checkoutInstance.id)
      if (refreshed && !refreshed.completedAt) {
        checkoutInstance = refreshed
        return checkoutInstance
      }
    } catch { /* create a new one */ }
  }
  checkoutInstance = await client.checkout.create()
  return checkoutInstance
}

// Buy Now: create a fresh checkout with just this item and redirect
export async function buyNow(variantId) {
  const checkout = await client.checkout.create()
  const result = await client.checkout.addLineItems(checkout.id, [
    { variantId, quantity: 1 },
  ])
  window.location.href = result.webUrl
}

// Add to cart: add item to the persistent checkout
export async function addToShopifyCart(variantId) {
  const checkout = await getCheckout()
  checkoutInstance = await client.checkout.addLineItems(checkout.id, [
    { variantId, quantity: 1 },
  ])
  return checkoutInstance
}

// Go to checkout with all cart items, or pass custom lineItems (creates a fresh checkout for selected items)
export async function goToCheckout(lineItems) {
  if (lineItems && lineItems.length > 0) {
    const checkout = await client.checkout.create()
    const result = await client.checkout.addLineItems(checkout.id, lineItems)
    window.location.href = result.webUrl
  } else {
    const checkout = await getCheckout()
    if (checkout.webUrl) {
      window.location.href = checkout.webUrl
    }
  }
}

// Get current checkout line items count
export async function getCartCount() {
  if (!checkoutInstance) return 0
  return checkoutInstance.lineItems?.length || 0
}

export async function fetchShopifyProducts() {
  const products = []
  let cursor = null
  let hasNextPage = true
  const query = `
    query StoreProducts($after: String) {
      products(first: 100, after: $after) {
        nodes {
          id
          title
          handle
          productType
          description
          descriptionHtml
          availableForSale
          images(first: 20) { nodes { url } }
          variants(first: 100) {
            nodes {
              id
              availableForSale
              price { amount currencyCode }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `

  while (hasNextPage) {
    const response = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables: { after: cursor } }),
    })
    if (!response.ok) throw new Error('Unable to load Shopify products.')
    const payload = await response.json()
    if (payload.errors) throw new Error(payload.errors[0]?.message || 'Unable to load Shopify products.')
    const page = payload.data.products
    products.push(...page.nodes.map((product) => ({
      ...product,
      images: product.images.nodes.map((image) => ({ src: image.url })),
      variants: product.variants.nodes.map((variant) => ({
        ...variant,
        available: variant.availableForSale,
      })),
    })))
    hasNextPage = page.pageInfo.hasNextPage
    cursor = page.pageInfo.endCursor
  }

  return products
}

export default client
