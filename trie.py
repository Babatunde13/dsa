class TrieNode:
    def __init__(self):
        self.children = {}
        self.suggestions = []  # Store up to 3 product names at this node

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, product):
        node = self.root
        for char in product:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            # Add product to suggestions at this node
            if len(node.suggestions) < 3:
                node.suggestions.append(product)
                node.suggestions.sort()  # Ensure lexicographic order
            elif product < node.suggestions[-1]:  # Replace the largest if new product is smaller
                node.suggestions[-1] = product
                node.suggestions.sort()

    def search(self, prefix):
        node = self.root
        result = []
        for char in prefix:
            if char in node.children:
                node = node.children[char]
                result.append(node.suggestions)
            else:
                # If prefix does not exist, append empty suggestions for remaining characters
                result.extend([[]] * (len(prefix) - len(result)))
                break
        return result

def suggestedProducts(products, search_query):
    # Step 1: Sort the products lexicographically
    products.sort()

    # Step 2: Build the Trie
    trie = Trie()
    for product in products:
        trie.insert(product)

    print('m sugestiions ===>', trie.root.children['m'].children['o'].children)
    # Step 3: Search for suggestions for each prefix of the query
    return trie.search(search_query)

# Example usage
products = ["mobile", "mouse", "moneypot", "monitor", "mousepad", "apple", "applephone"]
search_query = "mouse"
print(suggestedProducts(products, search_query))
