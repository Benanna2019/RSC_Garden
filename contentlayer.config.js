import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('contentlayer/source-files').ComputedFields} */
const blogComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  structuredData: {
    type: 'object',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.excerpt,
      image: `https://www.benapatton.dev/og?title=${doc.title}`,
      url: `https://www.benapatton.dev/blog/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: 'Ben Patton',
      },
    }),
  },
}

// add a newsletter type for Career Changers newsletter archived issues

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    _id: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    categories: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: true,
    },
    author: {
      type: 'string',
      required: true,
    },
    authorImage: {
      type: 'string',
      required: true,
    },
    type: {
      type: 'string',
      required: true,
    },
  },
  computedFields: blogComputedFields,
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
