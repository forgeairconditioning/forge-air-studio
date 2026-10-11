import {defineType, defineField} from 'sanity'

// One short line of text, stored in both languages side by side.
export const localeString = defineType({
  name: 'localeString',
  title: 'Text (EN / ES)',
  type: 'object',
  options: {columns: 2},
  fields: [
    defineField({name: 'en', title: 'English', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'es', title: 'Español', type: 'string', validation: (r) => r.required()}),
  ],
})
