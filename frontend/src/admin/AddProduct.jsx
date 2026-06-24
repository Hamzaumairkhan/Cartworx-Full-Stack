import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiArrowLeft, FiPackage } from 'react-icons/fi';
import { createProduct, clearProductState } from '../redux/productSlice';
import toast from 'react-hot-toast';

const CATEGORIES = ['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports', 'Books', 'Other'];

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);
  const { loading } = useSelector((s) => s.products);

  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (imageFile) formData.append('image', imageFile);

    const result = await dispatch(createProduct({ formData, token }));
    if (createProduct.fulfilled.match(result)) {
      toast.success('Product created successfully!');
      dispatch(clearProductState());
      navigate('/admin/products');
    } else {
      toast.error(result.payload || 'Failed to create product');
    }
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: 820 }}>

        {/* Back */}
        <button onClick={() => navigate('/admin/products')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.875rem', marginBottom: '1.5rem', transition: 'var(--transition)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'white'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <FiArrowLeft /> Back to Products
        </button>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>
          <FiPackage style={{ color: 'var(--primary)', verticalAlign: 'middle', marginRight: '0.5rem' }} />
          Add New Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>

            {/* Left: Fields */}
            <div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', padding: '1.75rem', marginBottom: '1.25rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--bg-border)' }}>
                  Product Info
                </h3>

                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input name="name" className="form-input" placeholder="e.g. Premium Wireless Headphones" value={form.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea name="description" className="form-textarea" placeholder="Describe your product in detail..." value={form.description} onChange={handleChange} required style={{ minHeight: 120 }} />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Price ($) *</label>
                    <input name="price" type="number" min="0" step="0.01" className="form-input" placeholder="0.00" value={form.price} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock Qty</label>
                    <input name="stock" type="number" min="0" className="form-input" placeholder="0" value={form.stock} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Category *</label>
                  <select name="category" className="form-select" value={form.category} onChange={handleChange} required>
                    <option value="">Select category...</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', padding: '1.75rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--bg-border)' }}>
                  Product Image
                </h3>

                {/* Preview */}
                <div style={{
                  width: '100%', aspectRatio: '1', borderRadius: 'var(--radius)', overflow: 'hidden',
                  border: `2px dashed ${imagePreview ? 'var(--primary)' : 'var(--bg-border)'}`,
                  background: 'var(--bg-input)', marginBottom: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'var(--transition)',
                }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '2rem' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🖼️</div>
                      <p style={{ fontSize: '0.875rem' }}>No image selected</p>
                    </div>
                  )}
                </div>

                <label style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(229,62,62,0.1)', border: '1.5px dashed rgba(229,62,62,0.4)',
                  color: 'var(--primary-light)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(229,62,62,0.18)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(229,62,62,0.1)'; e.currentTarget.style.borderColor = 'rgba(229,62,62,0.4)'; }}
                >
                  <FiUpload /> Upload Image
                  <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                </label>
                {imageFile && <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem', textAlign: 'center' }}>{imageFile.name}</p>}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0.875rem 2rem' }}>
              {loading ? 'Creating...' : '+ Create Product'}
            </button>
            <button type="button" onClick={() => navigate('/admin/products')} className="btn-outline" style={{ padding: '0.875rem 2rem' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
