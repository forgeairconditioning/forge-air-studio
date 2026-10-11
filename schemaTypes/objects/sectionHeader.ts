import {defineType, defineField} from 'sanity'

// Reused by every section: small label above, big heading, optional intro line.
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section header',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above the heading', type: 'localeString'}),
    defineField({name: 'heading', title: 'Heading', type: 'localeString'}),
    defineField({name: 'intro', title: 'Intro paragraph', type: 'localeText'}),
  ],
})
