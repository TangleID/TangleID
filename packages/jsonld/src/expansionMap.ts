export const strictExpansionMap = (info: any) => {
  if (info.unmappedProperty) {
    throw new Error(
      `The property "${
        info.unmappedProperty
      }" in the input was not defined in the context.`,
    );
  }
};
