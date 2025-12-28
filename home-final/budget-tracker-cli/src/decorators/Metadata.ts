export function Metadata(metadata: Record<string, any>) {
  return function (target: any) {
    for (const key in metadata) {
      Reflect.defineMetadata(key, metadata[key], target);
    }
  };
}
