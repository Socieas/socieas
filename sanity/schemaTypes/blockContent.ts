import {defineArrayMember, defineType} from 'sanity'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',

  of: [
    defineArrayMember({
      type: 'block',
    }),

    defineArrayMember({
      type: 'image',

      options: {
        hotspot: true,
      },
    }),
  ],
})