import type { CollectionConfig } from "payload/types"

export const Documents: CollectionConfig = {
  slug: "documents",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "file",
      type: "upload",
      required: false, // TODO: should be true but validation fails. Remove when fixed.
      relationTo: "media",
    },
    {
      name: "description",
      type: "text",
      required: false,
    },
    {
      name: "date",
      type: "date",
      required: true,
      defaultValue: () => new Date(),
    }
  ],
}
