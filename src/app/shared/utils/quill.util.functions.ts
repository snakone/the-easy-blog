import { slugify } from "@core/services/quill/quill.module";
import { PostHeader } from "@shared/types/interface.post";
import { DeltaOperation } from "quill";

/**
 * Get a Quill Message and return the H2 headers with unique ID.
 * 
 * Used to create the Post index.
*/
export function getQuillHeaders(ops: DeltaOperation[]): PostHeader[] {
  if (ops) {
    const headers = ops.map(
      (o: DeltaOperation, i) => {
        if (o.attributes?.header === 2) {
          const str: string = ops[i - 1] && ops[i - 1].insert?.split('\n');
          const text =  str[str.length - 1];
          return {text, id: slugify(text)} as PostHeader;
        }

        return null;
      }
    ).filter(s => Boolean(s));
    return headers;
  }
  return [];
}