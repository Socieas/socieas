import { defineConfig } from "sanity";

import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";

import { structure } from "./sanity/structure";

import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",

  title: "Socieas CMS",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
});