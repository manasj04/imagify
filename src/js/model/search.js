import axios from "axios";
import { config } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
    this.pageNo = 1;
    this.results = [];
  }

  async getResults() {
    try {
      const res = await axios(
        `https://pixabay.com/api/?key=${config.API_KEY}&q=${this.query}&image_type=photo&per_page=${config.RESULTS_PER_PAGE}&page=${this.pageNo}`
      );
      this.currentResult = res.data.hits;
      this.totalPageNo = res.data.totalHits / config.RESULTS_PER_PAGE;
      this.results = this.results.concat(this.currentResult);
    } catch (error) {
      alert(error);
    }
  }

  nextPageAvaibility() {
    return this.pageNo < this.totalPageNo;
  }

  increasePageNo() {
    this.pageNo++;
  }

  getSelectedImageIndex(imageId) {
    let currentIndex = this.results.findIndex((value) => value.id === imageId);
    return currentIndex;
  }

  getImageIndex(index, navigationButton) {
    let currentIndex = index;
    if (navigationButton === "prev") {
      if (index === 0) {
        currentIndex = this.results.length - 1;
      } else {
        currentIndex--;
      }
    } else {
      if (index === this.results.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
    }

    return currentIndex;
  }

  getImageUrl(index) {
    return this.results[index].largeImageURL;
  }
}
