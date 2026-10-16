import {defineType, defineField, defineArrayMember} from 'sanity'

const ICONS = [
  {title: 'Snowflake', value: 'snowflake'},
  {title: 'Wrench', value: 'wrench'},
  {title: 'Thermometer', value: 'thermometer'},
  {title: 'Wind / airflow', value: 'wind'},
  {title: 'Shield', value: 'shield'},
  {title: 'Clock', value: 'clock'},
  {title: 'Alert (exclamation)', value: 'alert'},
  {title: 'Calendar', value: 'calendar'},
]

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'whatWeDo', title: 'What we do'},
    {name: 'serviceArea', title: 'Service area'},
    {name: 'gallery', title: 'Gallery'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'contact', title: 'Contact form'},
  ],
  fields: [
    // ---------- HERO ----------
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'chips',
          title: 'Badges above the headline',
          type: 'array',
          of: [defineArrayMember({type: 'localeString'})],
          validation: (r) => r.length(2),
        }),
        defineField({name: 'headlineLine1', title: 'Headline – line 1', type: 'localeString'}),
        defineField({name: 'headlineLine2', title: 'Headline – line 2', type: 'localeString'}),
        defineField({name: 'tagline', title: 'Tagline', type: 'localeString'}),
        defineField({name: 'description', title: 'Description', type: 'localeText'}),
      ],
    }),

    // ---------- WHAT WE DO ----------
    defineField({
      name: 'whatWeDo',
      title: 'What we do',
      type: 'object',
      group: 'whatWeDo',
      fields: [
        defineField({name: 'header', type: 'sectionHeader'}),
        defineField({
          name: 'accentWord',
          title: 'Highlighted word in the heading',
          description: 'The word styled in the accent color. Must appear in the heading.',
          type: 'localeString',
        }),
        defineField({
          name: 'image',
          title: 'Thermostat image',
          type: 'image',
          options: {hotspot: true},
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'items',
          title: 'Services (exactly 4)',
          type: 'array',
          validation: (r) => r.length(4),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'service',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: {list: ICONS},
                  validation: (r) => r.required(),
                }),
                defineField({name: 'title', title: 'Title', type: 'localeString'}),
                defineField({name: 'description', title: 'Description', type: 'localeText'}),
              ],
              preview: {select: {title: 'title.en', subtitle: 'title.es'}},
            }),
          ],
        }),
      ],
    }),

    // ---------- SERVICE AREA ----------
    defineField({
      name: 'serviceArea',
      title: 'Service area',
      type: 'object',
      group: 'serviceArea',
      fields: [
        defineField({
          name: 'header',
          title: 'Header (intro = coverage paragraph)',
          type: 'sectionHeader',
        }),
        defineField({
          name: 'image',
          title: 'Van + map image',
          description: 'One combined image. Use a transparent PNG so the background shows through.',
          type: 'image',
          validation: (r) => r.required(),
        }),
      ],
    }),

    // ---------- GALLERY ----------
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'object',
      group: 'gallery',
      fields: [
        defineField({name: 'header', type: 'sectionHeader'}),
        defineField({
          name: 'items',
          title: 'Photos (exactly 3)',
          type: 'array',
          validation: (r) => r.length(3),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'photo',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Photo',
                  type: 'image',
                  options: {hotspot: true},
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt text (describes the photo for screen readers)',
                  type: 'localeString',
                }),
                defineField({name: 'caption', title: 'Caption', type: 'localeString'}),
              ],
              preview: {select: {title: 'caption.en', subtitle: 'alt.en', media: 'image'}},
            }),
          ],
        }),
      ],
    }),

    // ---------- TESTIMONIALS ----------
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'object',
      group: 'testimonials',
      fields: [
        defineField({name: 'header', type: 'sectionHeader'}),
        defineField({
          name: 'items',
          title: 'Testimonials (exactly 3)',
          type: 'array',
          validation: (r) => r.length(3),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'testimonial',
              fields: [
                defineField({name: 'quote', title: 'Quote', type: 'localeText'}),
                defineField({
                  name: 'name',
                  title: 'Customer name',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'location',
                  title: 'Location',
                  description: 'e.g. Homestead, FL',
                  type: 'string',
                }),
                defineField({
                  name: 'rating',
                  title: 'Stars (1–5)',
                  type: 'number',
                  initialValue: 5,
                  validation: (r) => r.required().integer().min(1).max(5),
                }),
              ],
              preview: {select: {title: 'name', subtitle: 'quote.en'}},
            }),
          ],
        }),
      ],
    }),

    // ---------- CONTACT ----------
    defineField({
      name: 'contact',
      title: 'Contact form',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({name: 'header', type: 'sectionHeader'}),
        defineField({name: 'perkLine', title: 'Perk line (e.g. Financing available)', type: 'localeString'}),
        defineField({name: 'helpLabel', title: 'Label above the call / WhatsApp options', type: 'localeString'}),
        defineField({name: 'whatsappLine', title: 'WhatsApp line', type: 'localeString'}),
        defineField({name: 'privacyNote', title: 'Small note under the form', type: 'localeString'}),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})
