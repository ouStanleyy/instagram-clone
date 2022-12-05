const isVideo = (url) => {
  const urlParts = url?.split(".");
  const type = urlParts?.[urlParts.length - 1];
  // add to allowed extensions in aws.py

  return type === "mov" || type === "mp4" || type === "ogg";
};

export default isVideo;
