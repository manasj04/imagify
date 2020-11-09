import { elements, clearLoader } from "./base";

export const renderImage = (imageUrl) => {
  elements.modalImageContainer.empty();
  const html = `<img class="theme-modal-image img-fluid js-modal-image" src="${imageUrl}">`;
  elements.modalImageContainer.append(html);
  elements.modalContainer.modal({ show: true });
  $(".js-modal-image").on("load", () => {
    clearLoader();
  });
};
