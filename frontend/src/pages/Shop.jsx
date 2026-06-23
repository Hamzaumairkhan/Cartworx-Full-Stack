import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import '../styles/products.css';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports', 'Books'];

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = products
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchCat && matchPrice;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="shop-page">
      {/* Hero */}
      <div className="shop-hero">
        <div className="container">
          <h1>Our <span className="text-gradient">Shop</span></h1>
          <p>Browse {products.length}+ products across all categories</p>
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          {/* Search */}
          <div className="filter-card">
            <h3>Search</h3>
            <div className="filter-search">
              <FiSearch className="filter-search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div className="filter-card">
            <h3>Category</h3>
            <ul className="category-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    className={category === cat ? 'active' : ''}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                    <span style={{ background: 'var(--bg-input)', padding: '0.1rem 0.5rem', borderRadius: '100px', fontSize: '0.7rem' }}>
                      {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="filter-card">
            <h3>Price Range</h3>
            <div className="price-range">
              <input
                type="range"
                min={0}
                max={10000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="price-labels">
                <span>$0</span>
                <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>${maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Reset */}
          {(search || category !== 'All' || maxPrice < 10000) && (
            <button
              onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(10000); setSort('default'); }}
              style={{ width: '100%', padding: '0.7rem', background: 'transparent', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--error)'; e.currentTarget.style.color = 'var(--error)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <FiX /> Clear Filters
            </button>
          )}
        </aside>

        {/* Main */}
        <main>
          <div className="shop-main-header">
            <p className="shop-results-count">
              Showing <span>{filtered.length}</span> of <span>{products.length}</span> products
            </p>
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-container"><div className="spinner" /></div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
