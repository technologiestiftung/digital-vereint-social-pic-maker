interface getCoverImageDimensionsType {
  imageWidth: number;
  imageHeight: number;
  containerHeight: number;
  containerWidth: number;
}

export function getCoverImageDimensions({
  imageWidth,
  imageHeight,
  containerWidth,
  containerHeight,
}: getCoverImageDimensionsType): {
  width: number;
  height: number;
} {
  const childRatio = imageWidth / imageHeight;
  const parentRatio = containerWidth / containerHeight;
  let width = containerWidth;
  let height = containerHeight;

  if (childRatio < parentRatio) {
    height = width / childRatio;
  } else {
    width = height * childRatio;
  }

  return {
    width,
    height,
  };
}
