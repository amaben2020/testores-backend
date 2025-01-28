import { loadEnv, defineConfig } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

const plugins = [
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: 'medusa-plugin-wishlist',
  },
];

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // databaseUrl:
    //   'postgresql://neondb_owner:npg_F82ukohdXraz@ep-nameless-mountain-a40whqli-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require',
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  plugins: [
    {
      resolve: '@medusajs/payment',
      options: {
        providers: [
          {
            resolve: '@medusajs/payment-stripe',
            id: 'stripe',
            options: {
              apiKey: process.env.STRIPE_API_KEY!,
              webhookSecret: '',
            },
          },
          {
            resolve: 'medusa-payment-paystack',
            options: {
              secret_key: process.env.PAYSTACK_SECRET_KEY!,
            } satisfies import('medusa-payment-paystack').PluginOptions,
            public_key: process.env.PAYSTACK_PUBLIC_KEY,
          },
        ],
      },
    },
  ],
});
