import prisma from '../prisma';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Starting database seeding...');

  // 🧹 CLEAN DATABASE (URUTAN PENTING)
  await prisma.orderItems.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data');

  // =========================
  // 1️⃣ CATEGORIES
  // =========================
  console.log('📦 Creating categories...');
  const categoryNames = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports & Outdoors',
    'Toys & Games',
    'Food & Beverages',
    'Beauty & Health',
    'Automotive',
    'Office Supplies'
  ];

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.create({
        data: { name }
      })
    )
  );

  console.log(`✅ Created ${categories.length} categories`);

  // =========================
  // 2️⃣ USERS
  // =========================
  console.log('👥 Creating users...');
  const users = await Promise.all(
    Array.from({ length: 50 }, async () => {
      const password = await bcrypt.hash('password123', 10);
      return prisma.user.create({
        data: {
          username: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
          password_hash: password
        }
      });
    })
  );

  console.log(`✅ Created ${users.length} users`);

  // =========================
  // 3️⃣ PRODUCTS
  // =========================
  console.log('🛍️ Creating products...');
  const products = await Promise.all(
    Array.from({ length: 100 }, () => {
      const category = faker.helpers.arrayElement(categories);
      return prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: Number(
            faker.commerce.price({ min: 10, max: 1000, dec: 2 })
          ),
          stock: faker.number.int({ min: 0, max: 500 }),
          image: faker.image.url(),
          category: {
            connect: { id: category.id }
          }
        }
      });
    })
  );

  console.log(`✅ Created ${products.length} products`);

  // =========================
  // 4️⃣ ORDERS + ORDER ITEMS
  // =========================
  console.log('🛒 Creating orders...');
  const orders = [];

  for (let i = 0; i < 150; i++) {
    const user = faker.helpers.arrayElement(users);
    const numItems = faker.number.int({ min: 1, max: 5 });
    const selectedProducts = faker.helpers.arrayElements(products, numItems);

    let total = 0;

    const orderItemsData = selectedProducts.map((product) => {
      const quantity = faker.number.int({ min: 1, max: 5 });
      total += Number(product.price) * quantity;

      return {
        product: {
          connect: { id: product.id }
        },
        quantity
      };
    });

    const order = await prisma.orders.create({
      data: {
        user: {
          connect: { id: user.id }
        },
        total: total,
        status: 'PAID',
        orderItems: {
          create: orderItemsData
        }
      },
      include: {
        orderItems: true
      }
    });

    orders.push(order);
  }

  console.log(`✅ Created ${orders.length} orders`);

  // =========================
  // 📊 SUMMARY
  // =========================
  const totalOrderItems = orders.reduce(
    (sum, order) => sum + order.orderItems.length,
    0
  );

  console.log('\n🎉 Seeding completed successfully!');
  console.log('📊 Summary:');
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Orders: ${orders.length}`);
  console.log(`   - Order Items: ${totalOrderItems}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
