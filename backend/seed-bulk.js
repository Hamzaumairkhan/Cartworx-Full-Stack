import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import connectDB from './database/db.js';

dotenv.config();

connectDB();

const categories = {
  'Electronics': [
    { name: 'Sony Noise Cancelling Headphones', desc: 'Industry leading noise cancellation.', price: 348.00, img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop' },
    { name: 'Apple iPhone 14 Pro', desc: 'A magical new way to interact with iPhone.', price: 999.00, img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop' },
    { name: 'Dell XPS 15 Laptop', desc: 'Pushing innovation to the edge.', price: 1899.00, img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop' },
    { name: 'Logitech MX Master 3S', desc: 'The iconic mouse, remastered.', price: 99.99, img: 'https://images.unsplash.com/photo-1527814050087-1e5b85a1cb5b?w=500&auto=format&fit=crop' },
    { name: 'Keychron K2 Mechanical Keyboard', desc: 'A versatile wireless mechanical keyboard.', price: 79.00, img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop' },
    { name: 'Samsung 49" Odyssey G9', desc: 'The curve revolution.', price: 1399.99, img: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&auto=format&fit=crop' },
    { name: 'GoPro HERO 11 Black', desc: 'Capture the action.', price: 399.00, img: 'https://images.unsplash.com/photo-1502920514313-5258100160f5?w=500&auto=format&fit=crop' },
    { name: 'Nintendo Switch OLED', desc: 'Play anytime, anywhere.', price: 349.99, img: 'https://images.unsplash.com/photo-1578288944596-fdd2659e9a4f?w=500&auto=format&fit=crop' },
    { name: 'Apple Watch Series 8', desc: 'A healthy leap ahead.', price: 399.00, img: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&auto=format&fit=crop' },
    { name: 'Bose SoundLink Revolve+', desc: 'Deep, loud and immersive sound.', price: 329.00, img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop' }
  ],
  'Clothing': [
    { name: 'Classic Denim Jacket', desc: 'Timeless style for every season.', price: 89.99, img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop' },
    { name: 'Cotton Crewneck T-Shirt', desc: 'Soft, breathable everyday essential.', price: 24.50, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop' },
    { name: 'Slim Fit Chinos', desc: 'Perfect blend of comfort and style.', price: 54.00, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop' },
    { name: 'Winter Puffer Coat', desc: 'Stay warm without the bulk.', price: 129.00, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' },
    { name: 'Vintage Plaid Flannel', desc: 'Rugged and comfortable.', price: 45.00, img: 'https://images.unsplash.com/photo-1588795904358-0063db15b565?w=500&auto=format&fit=crop' },
    { name: 'Athletic Joggers', desc: 'For workouts or lounging.', price: 39.99, img: 'https://images.unsplash.com/photo-1580906853149-f82f7601d205?w=500&auto=format&fit=crop' },
    { name: 'Silk Floral Dress', desc: 'Elegant design for special occasions.', price: 145.00, img: 'https://images.unsplash.com/photo-1515347619362-d9dc91090623?w=500&auto=format&fit=crop' },
    { name: 'Leather Biker Jacket', desc: 'Edgy and classic.', price: 299.00, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop' },
    { name: 'Casual Linen Shirt', desc: 'Breezy and lightweight.', price: 65.00, img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e98?w=500&auto=format&fit=crop' },
    { name: 'Running Shoes X1', desc: 'Lightweight performance running shoes.', price: 110.00, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' }
  ],
  'Accessories': [
    { name: 'Polarized Aviator Sunglasses', desc: 'Classic protection for your eyes.', price: 155.00, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop' },
    { name: 'Genuine Leather Wallet', desc: 'Slim, durable, and stylish.', price: 45.00, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop' },
    { name: 'Automatic Chronograph Watch', desc: 'Precision engineering on your wrist.', price: 499.00, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop' },
    { name: 'Canvas Weekend Duffel', desc: 'Perfect for short getaways.', price: 85.00, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop' },
    { name: 'Minimalist Silver Necklace', desc: 'A subtle touch of elegance.', price: 65.00, img: 'https://images.unsplash.com/photo-1599643478524-fb4059cb20ed?w=500&auto=format&fit=crop' },
    { name: 'Wool Fedora Hat', desc: 'Classic style for the modern era.', price: 55.00, img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop' },
    { name: 'Silk Tie', desc: 'Premium silk for formal occasions.', price: 35.00, img: 'https://images.unsplash.com/photo-1595124036681-420042da65dd?w=500&auto=format&fit=crop' },
    { name: 'Leather Belt', desc: 'Durable everyday belt.', price: 30.00, img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&auto=format&fit=crop' },
    { name: 'Travel Backpack', desc: 'Designed for the modern traveler.', price: 120.00, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop' },
    { name: 'Gold Hoop Earrings', desc: 'Simple and elegant.', price: 85.00, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop' }
  ],
  'Home & Garden': [
    { name: 'Ceramic Coffee Mug Set', desc: 'Start your morning right.', price: 24.99, img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop' },
    { name: 'Monstera Deliciosa Plant', desc: 'Bring nature indoors.', price: 45.00, img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop' },
    { name: 'Linen Throw Blanket', desc: 'Cozy up on the couch.', price: 65.00, img: 'https://images.unsplash.com/photo-1580828369019-2220d5f17105?w=500&auto=format&fit=crop' },
    { name: 'Mid-Century Modern Chair', desc: 'Iconic design for your living room.', price: 299.00, img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&auto=format&fit=crop' },
    { name: 'Scented Soy Candle', desc: 'Relaxing lavender and vanilla.', price: 18.00, img: 'https://images.unsplash.com/photo-1602874801007-bd458cb6c975?w=500&auto=format&fit=crop' },
    { name: 'Cast Iron Skillet', desc: 'A kitchen essential that lasts a lifetime.', price: 45.00, img: 'https://images.unsplash.com/photo-1585675402035-717da2019409?w=500&auto=format&fit=crop' },
    { name: 'Woven Storage Basket', desc: 'Stylish organization.', price: 35.00, img: 'https://images.unsplash.com/photo-1584589167101-5d9c79de3c3f?w=500&auto=format&fit=crop' },
    { name: 'Abstract Wall Art', desc: 'Add color to your space.', price: 120.00, img: 'https://images.unsplash.com/photo-1544867885-23c3167b5435?w=500&auto=format&fit=crop' },
    { name: 'Bamboo Cutting Board', desc: 'Durable and eco-friendly.', price: 25.00, img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop' },
    { name: 'Hanging Planter Macrame', desc: 'Boho style for your plants.', price: 22.00, img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&auto=format&fit=crop' }
  ],
  'Sports': [
    { name: 'Yoga Mat with Alignment Lines', desc: 'Perfect your poses.', price: 35.00, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop' },
    { name: 'Adjustable Dumbbell Set', desc: 'A full gym in one compact set.', price: 199.00, img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop' },
    { name: 'Protein Shaker Bottle', desc: 'Mix your supplements with ease.', price: 12.99, img: 'https://images.unsplash.com/photo-1520192569502-d7b69a2da292?w=500&auto=format&fit=crop' },
    { name: 'Tennis Racket Pro', desc: 'Powerful swings and precision control.', price: 145.00, img: 'https://images.unsplash.com/photo-1622279457486-640c4cb686a8?w=500&auto=format&fit=crop' },
    { name: 'Resistance Bands Set', desc: 'Versatile workout anywhere.', price: 24.00, img: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format&fit=crop' },
    { name: 'Basketball Official Size', desc: 'For indoor and outdoor play.', price: 39.99, img: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop' },
    { name: 'Cycling Helmet', desc: 'Safety first on the road.', price: 65.00, img: 'https://images.unsplash.com/photo-1560023907-5f339617ea23?w=500&auto=format&fit=crop' },
    { name: 'Hiking Backpack 40L', desc: 'Ready for the trails.', price: 89.00, img: 'https://images.unsplash.com/photo-1622241944227-ae279379cc80?w=500&auto=format&fit=crop' },
    { name: 'Foam Roller', desc: 'Recovery and muscle relief.', price: 18.00, img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&auto=format&fit=crop' },
    { name: 'Jump Rope High Speed', desc: 'Cardio anywhere.', price: 15.00, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop' }
  ],
  'Books': [
    { name: 'The Great Gatsby', desc: 'A classic novel of the Jazz Age.', price: 14.99, img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop' },
    { name: 'Sapiens: A Brief History of Humankind', desc: 'Fascinating look at our history.', price: 22.00, img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop' },
    { name: 'Atomic Habits', desc: 'Build good habits and break bad ones.', price: 18.50, img: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop' },
    { name: 'Dune by Frank Herbert', desc: 'The epic sci-fi masterpiece.', price: 16.99, img: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=500&auto=format&fit=crop' },
    { name: 'The Art of War', desc: 'Ancient military treatise.', price: 9.99, img: 'https://images.unsplash.com/photo-1587843477141-945763a8a3ee?w=500&auto=format&fit=crop' },
    { name: '1984 by George Orwell', desc: 'A dystopian social science fiction novel and cautionary tale.', price: 12.99, img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop' },
    { name: 'Think and Grow Rich', desc: 'Personal development and self-help book.', price: 11.50, img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop' },
    { name: 'To Kill a Mockingbird', desc: 'A novel by Harper Lee.', price: 13.99, img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop' },
    { name: 'The Alchemist', desc: 'A novel by Paulo Coelho.', price: 15.00, img: 'https://imgs.search.brave.com/H2tJ2AGeJCKjndowih9zlq-v6Xw_d7NW0Y-abbp_47A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuYmxpbmtpc3Qu/aW8vaW1hZ2VzL2Jv/b2tzLzYzYzZjZDFm/Mzc4NDgwMDAwOGQ2/NmMwOS8xXzEvNDcw/LmpwZw' },
    { name: 'Rich Dad Poor Dad', desc: 'What the rich teach their kids about money.', price: 17.99, img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop' }
  ]
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateProducts = () => {
  const products = [];
  Object.keys(categories).forEach(category => {
    categories[category].forEach((item) => {
      products.push({
        name: item.name,
        description: item.desc,
        price: item.price,
        category: category,
        stock: getRandomInt(10, 100),
        imageUrls: [item.img],
        ratings: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
        numReviews: getRandomInt(5, 300)
      });
    });
  });
  return products;
};

const importData = async () => {
  try {
    // Clear ALL existing products first to avoid duplicates
    await Product.deleteMany({});

    const products = generateProducts();
    await Product.insertMany(products);

    console.log(`✅ Successfully wiped old products and added ${products.length} distinct products!`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
