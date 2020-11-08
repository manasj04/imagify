export const elements = {
  searchInput: $("#search-input"),
  searchButton: $("#search-button"),
  imageGallery: $(".js-image-gallery"),
  discoverMoreButton: $("#discover-more-button"),
  discoverMoreContainer: $(".js-discover-more-button"),
  backToTopButton: $("#back-to-top"),
  modalImageContainer: $(".js-modal-image-container"),
  modalContainer: $("#modal"),
  prevButton: $(".js-prev-btn"),
  nextButton: $(".js-next-btn"),
  imageLoaderContainer: $(".js-modal-loader"),
  searchText: $(".js-search-text")
};

export const renderLoader = (parent) => {
  const loader = `<div class="loader"><span></span><span></span><span></span><span></span><span></span></div>`;
  parent.append(loader);
};

export const clearLoader = () => {
  const loader = $(".loader");
  if (loader) {
    loader.remove();
  }
};
