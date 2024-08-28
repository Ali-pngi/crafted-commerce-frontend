import { Link } from 'react-router-dom'
import './Products.css'


const ProductList = ({ products }) => {
 console.log(products)




 return (
   <main className="products-list">
     {products.map((product) => (
       <Link key={product._id} to={`/products/${product._id}`} className="product-card-link">
         <article className="product-card">
           <header>
             <h2>{product.productName}</h2>
             <p>
               {product.user.username} posted on{' '}
               {new Date(product.createdAt).toLocaleDateString()}
             </p>
           </header>
           <p>{product.description}</p>
           {product.image && (
             <div className="upload-image" style={{ backgroundImage: `url(${product.image})` }}> </div>
           )}
         </article>
       </Link>
     ))}
   </main>
 )
}


export default ProductList