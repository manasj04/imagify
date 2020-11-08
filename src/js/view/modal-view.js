import { elements, clearLoader } from "./base";

export const renderImage = (imageUrl) => {
  elements.modalImageContainer.empty();
  elements.modalImageContainer.append(
    `<img class="theme-modal-image img-fluid js-modal-image" src="${imageUrl}">`
  );
  elements.modalContainer.modal({ show: true });
  $(".js-modal-image").on("load", () => {
    clearLoader();
  });
};
