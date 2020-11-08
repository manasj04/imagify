import "bootstrap";

import "../css/style.css";
import "../css/jquery.flex-images.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

import * as searchView from "./view/search-view";
import * as modalView from "./view/modal-view";
import Search from "./model/search";
import { elements, renderLoader } from "./view/base";
import { encodedSearchTerm } from "./helper";

const state = {};

const controlSearchResults = async (isFirstSearch) => {
  const query = encodedSearchTerm(searchView.getInput());

  if (!query && isFirstSearch) {
    return;
  }

  if (isFirstSearch) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
  } else if (!isFirstSearch && state.search.nextPageAvaibility()) {
    state.search.increasePageNo();
  }

  try {
    await state.search.getResults();
    searchView.renderResults(state.search.currentResult);
  } catch (error) {
    alert(error);
  }
};

const controlModalImage = (navigationButton) => {
  let imageUrl;

  renderLoader($(".js-modal-loader"));

  if (!navigationButton) {
    state.selectedImageIndex = state.search.getSelectedImageIndex(
      state.selectedImageId
    );
  } else {
    state.selectedImageIndex = state.search.getImageIndex(
      state.selectedImageIndex,
      navigationButton
    );
  }

  imageUrl = state.search.getImageUrl(state.selectedImageIndex);
  modalView.renderImage(imageUrl);
};

elements.searchButton.on("click", (e) => {
  controlSearchResults(true);
});

$(window).on("keypress", (e) => {
  if (e.key === "Enter") {
    controlSearchResults(true);
  }
});

$(window).on("scroll", () => {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    if (state.search.nextPageAvaibility()) {
      controlSearchResults(false);
    }
  }

  if ($(window).scrollTop() > 150) {
    elements.backToTopButton.addClass("show");
  } else {
    elements.backToTopButton.removeClass("show");
  }
});

elements.backToTopButton.on("click", (e) => {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});

elements.imageGallery.on("click", (e) => {
  if ($(e.target).hasClass("js-grid-image")) {
    state.selectedImageId = $(e.target).data("id");
    controlModalImage();
  }
});

elements.prevButton.on("click", () => {
  controlModalImage("prev");
});

elements.nextButton.on("click", () => {
  controlModalImage("next");
});
