import ProductList from "../components/ProductList";

export default function ProductsPage() {
  return (
    <div className="py-6">
      <ProductList params="products" />
    </div>
  );
}
