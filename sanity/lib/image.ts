import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset: dataset || "production",
});

export const urlFor = (source: any) => {
  return builder.image(source);
};
