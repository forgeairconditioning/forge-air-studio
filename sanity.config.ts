import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Documents that exist exactly once. Fixed IDs = one and only one document each.
const SINGLETONS = [
  {type: 'homePage', id: 'homePage', title: 'Home page'},
  {type: 'siteSettings', id: 'siteSettings', title: 'Site settings'},
]
const SINGLETON_TYPES = SINGLETONS.map((s) => s.type)

export default defineConfig({
  name: 'default',
  title: 'Forge Air Landing page',

  projectId: 'a4y5fyxx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items(
            SINGLETONS.map((s) =>
              S.listItem()
                .title(s.title)
                .id(s.id)
                .child(S.document().schemaType(s.type).documentId(s.id)),
            ),
          ),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide the "create new" button for singletons
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.includes(schemaType)),
  },

  document: {
    // Singletons can be edited and published, but not duplicated or deleted
    actions: (input, {schemaType}) =>
      SINGLETON_TYPES.includes(schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
