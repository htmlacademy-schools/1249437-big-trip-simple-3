import SortView from '../view/sort';
import EventListView from '../view/events-list';
import EventItemView from '../view/event-item';
import EditFormView from '../view/edit-point';
import NewItemFormView from '../view/create-form';
import { render } from '../render';

export default class BoardPresenter {
  eventListComponent = new EventListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new NewItemFormView(), this.eventListComponent.getElement());
    render(new EventItemView(), this.eventListComponent.getElement());
    render(new EditFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventListComponent.getElement());
    }
  }
}
