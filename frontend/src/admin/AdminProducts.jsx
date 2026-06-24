import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiPackage, FiShoppingBag } from 'react-icons/fi';
import { fetchProducts, deleteProduct } from '../redux/productSlice';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.products);
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const result = await dispatch(deleteProduct({ id, token }));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success(`"${name}" deleted successfully`);
    } else {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>Products</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{products.length} products in catalogue</p>
          </div>
          <Link to="/admin/products/add" className="btn-primary">
            <FiPlus /> Add Product
          </Link>
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <FiPackage style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--bg-border)' }} />
            <h3>No products yet</h3>
            <p>Add your first product to get started</p>
            <Link to="/admin/products/add" className="btn-primary" style={{ marginTop: '1rem' }}>Add Product</Link>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)', border: '1px solid var(--bg-border)' }}>
                            {p.imageUrls && p.imageUrls.length > 0 
                              ? <img src={p.imageUrls[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiShoppingBag size={18} color="var(--text-dim)" /></div>
                            }
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>{p._id.slice(-8)}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(229,62,62,0.1)', color: 'var(--primary-light)', border: '1px solid rgba(229,62,62,0.2)' }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--text-white)' }}>${Number(p.price).toFixed(2)}</td>
                      <td>
                        <span style={{ color: p.stock === 0 ? 'var(--error)' : p.stock < 5 ? '#f6ad55' : '#68d391', fontWeight: 600, fontSize: '0.875rem' }}>
                          {p.stock === 0 ? 'Out of stock' : `${p.stock} units`}
                        </span>
                      </td>
                      <td style={{ color: '#f6ad55', fontSize: '0.875rem' }}>★ {p.ratings?.toFixed(1) || '0.0'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Link to={`/admin/products/edit/${p._id}`} style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            padding: '0.4rem 0.75rem', borderRadius: 6,
                            background: 'rgba(99,179,237,0.1)', border: '1px solid rgba(99,179,237,0.2)',
                            color: '#63b3ed', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none',
                            transition: 'var(--transition)',
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,179,237,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,179,237,0.1)'}
                          >
                            <FiEdit2 /> Edit
                          </Link>
                          <button onClick={() => handleDelete(p._id, p.name)} style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            padding: '0.4rem 0.75rem', borderRadius: 6,
                            background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.2)',
                            color: 'var(--primary-light)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                            transition: 'var(--transition)',
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(229,62,62,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(229,62,62,0.1)'}
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
