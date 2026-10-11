import {defineType, defineField} from 'sanity'

// Same idea as localeString, but a multi-line text box for paragraphs.
export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraph (EN / ES)',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'es', title: 'Español', type: 'text', rows: 4, validation: (r) => r.required()}),
  ],
})
