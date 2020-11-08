import { elements } from "./base";
import "../external/jquery.flex-images";

export const getInput = () => elements.searchInput.val();

export const renderResults = (imageResults) => {
  const html = imageResults
    .map(
      (result) =>
        `<div class="item" data-w="${result.webformatWidth}" data-h="${result.webformatHeight}"><img class="theme-grid-image js-grid-image" data-id="${result.id}" data-large-image-url="${result.largeImageURL}" src="${result.webformatURL}"></div>`
    )
    .join("");
  elements.imageGallery.append(html);
  elements.imageGallery.flexImages({ rowHeight: 180 });
};

export const clearInput = () => {
  elements.searchInput.val("");
};

export const clearResult = () => {
  elements.imageGallery.empty();
};

export const setSearchText = (isResultsFound, query) => {
  let html;
  if(isResultsFound){
    html = `Showing images for <em><strong>${query}</strong></em>.`;
  }else{
    html = `Sorry, no results for <em><strong>${query}</strong></em>. Try Something else.`;
  }
  elements.searchText.html(html)
};
