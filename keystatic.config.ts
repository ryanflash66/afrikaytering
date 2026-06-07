import { config, fields, collection, singleton } from '@keystatic/core'

// Keystatic CMS schema for the Afrikaytering menu.
// Storage is `local`: editing happens at http://localhost:4321/keystatic during
// `npm run dev` and writes plain YAML files into the `content/` folder.
// Paths have NO trailing slash, so each entry is a single `.yaml` file.
export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Afrikaytering' },
    navigation: {
      Menu: ['menuItems', 'categories'],
      Restaurant: ['restaurant'],
    },
  },

  singletons: {
    restaurant: singleton({
      label: 'Restaurant settings',
      path: 'content/settings/restaurant',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({
          label: 'Restaurant name',
          validation: { isRequired: true },
        }),
        tagline: fields.text({ label: 'Tagline', description: 'Shown under the name' }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/brand',
          publicPath: '/images/brand/',
        }),
        currency: fields.select({
          label: 'Currency',
          options: [
            { label: 'US Dollar ($)', value: 'USD' },
            { label: 'Euro (€)', value: 'EUR' },
            { label: 'CFA Franc (FCFA)', value: 'XAF' },
          ],
          defaultValue: 'USD',
        }),
        phone: fields.text({
          label: 'Phone number',
          description: 'Tap-to-call, e.g. +1 555 123 4567',
        }),
        whatsapp: fields.text({
          label: 'WhatsApp number',
          description: 'Country code + number, digits only, e.g. 15551234567',
        }),
        address: fields.text({ label: 'Address', multiline: true }),
        mapsUrl: fields.url({ label: 'Directions link', description: 'Google Maps URL' }),
        hours: fields.text({
          label: 'Opening hours',
          multiline: true,
          description: 'One line per day, or a short note',
        }),
        instagram: fields.url({ label: 'Instagram URL' }),
        facebook: fields.url({ label: 'Facebook URL' }),
      },
    }),
  },

  collections: {
    categories: collection({
      label: 'Categories',
      path: 'content/categories/*',
      slugField: 'name',
      format: { data: 'yaml' },
      columns: ['name', 'type', 'order'],
      schema: {
        name: fields.slug({
          name: { label: 'Name', validation: { isRequired: true } },
          slug: { description: 'Used in the page link (auto-generated)' },
        }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Food', value: 'food' },
            { label: 'Drink', value: 'drink' },
          ],
          defaultValue: 'food',
        }),
        description: fields.text({ label: 'Short description' }),
        order: fields.integer({ label: 'Sort order', defaultValue: 1 }),
        visible: fields.checkbox({ label: 'Show on menu', defaultValue: true }),
      },
    }),

    menuItems: collection({
      label: 'Menu items',
      path: 'content/menu/*',
      slugField: 'name',
      format: { data: 'yaml' },
      columns: ['name', 'price'],
      schema: {
        name: fields.slug({
          name: { label: 'Name', validation: { isRequired: true } },
        }),
        category: fields.relationship({
          label: 'Category',
          collection: 'categories',
          validation: { isRequired: true },
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        price: fields.number({
          label: 'Price',
          validation: { isRequired: true, min: 0 },
        }),
        image: fields.image({
          label: 'Photo',
          directory: 'public/images/menu',
          publicPath: '/images/menu/',
        }),
        imageAlt: fields.text({
          label: 'Photo description (alt text)',
          description: 'Describe the photo for accessibility',
        }),
        dietaryTags: fields.multiselect({
          label: 'Dietary tags',
          options: [
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Vegan', value: 'vegan' },
            { label: 'Halal', value: 'halal' },
            { label: 'Gluten-free', value: 'gluten-free' },
            { label: 'Dairy-free', value: 'dairy-free' },
            { label: 'Contains nuts', value: 'contains-nuts' },
            { label: 'Spicy', value: 'spicy' },
          ],
        }),
        featured: fields.checkbox({
          label: 'Featured / special',
          description: 'Show in the Specials section at the top',
          defaultValue: false,
        }),
        available: fields.checkbox({ label: 'Available', defaultValue: true }),
        order: fields.integer({ label: 'Sort order', defaultValue: 1 }),
      },
    }),
  },
})
