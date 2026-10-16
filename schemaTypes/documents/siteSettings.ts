import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone number',
      description: 'Shown in the header and used by the Call Now button. Same in both languages.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'callLabel',
      title: 'Call button label',
      description: 'Shown on the mobile sticky button, e.g. "Call Now".',
      type: 'localeString',
    }),
    defineField({name: 'footerTagline', title: 'Footer tagline', type: 'localeText'}),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram profile link',
      description:
        'Full link to the Instagram profile, e.g. https://www.instagram.com/forgeair. Leave empty to hide the Instagram icon. Same in both languages.',
      type: 'url',
      validation: (r) =>
        r.uri({scheme: ['https']}).custom((value) => {
          if (!value) return true
          return /^https:\/\/(www\.)?instagram\.com\/\S+/.test(value)
            ? true
            : 'Must be an Instagram link (https://www.instagram.com/...)'
        }),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show WhatsApp on the website',
          description: 'Turn off to hide every WhatsApp button and link.',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'number',
          title: 'WhatsApp number',
          description: 'Digits only with country code, e.g. 17865551234 (no +, spaces or dashes).',
          type: 'string',
          validation: (r) =>
            r.custom((value, ctx) => {
              const enabled = (ctx.parent as {enabled?: boolean} | undefined)?.enabled
              if (enabled && !value) return 'Required while WhatsApp is on'
              if (value && !/^\d{8,15}$/.test(value)) return 'Digits only, 8–15 numbers'
              return true
            }),
        }),
        defineField({
          name: 'message',
          title: 'Pre-filled message',
          description: 'What the customer sees already typed when WhatsApp opens.',
          type: 'localeText',
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
