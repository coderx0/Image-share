export function transformCloudinaryURL(inputURL:string, width = 500) {
    if (!inputURL.startsWith("https://res.cloudinary.com/calmbit/image/upload/")) {
      return null;
    }
  
    // Split the URL into parts
    const parts = inputURL.split("/");
  
    // Extract the necessary components
    const cloudName = parts[3];
    const publicID = parts[parts.length - 1];
    const version = parts[parts.length - 2];
  
    // Construct the transformed URL
    const transformedURL = `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_${width}/f_auto/q_auto/${version}/${publicID}`;
  
    return transformedURL;
  }
  