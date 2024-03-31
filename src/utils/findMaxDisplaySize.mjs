
/**
 * Returns the largest display size that fits within the given aspect ratio.
 * @param {number} aspectRatio 
 */
export function findMaxDisplaySize(aspectRatio) {
  if (!aspectRatio) { throw new Error('Aspect Ratio is required'); }
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Adjust width and height based on the aspect ratio
  if (width / height > aspectRatio) {
    // Window is too wide
    width = height * aspectRatio;
  } else {
    // Window is too tall
    height = width / aspectRatio;
  }

  return { width, height };
}