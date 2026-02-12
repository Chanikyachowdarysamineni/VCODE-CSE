// Helper function to convert Cloudinary URLs to use optimization parameters
export const optimizeCloudinaryUrl = (url: string): string => {
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }
  
  // Insert optimization parameters before the version/filename
  return url.replace(
    "/image/upload/",
    "/image/upload/c_limit,w_800,q_80/"
  );
};
