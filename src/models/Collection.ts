import axios, { AxiosResponse } from "axios";

import { Eventing } from "./Eventing";

export class Collection<T, U> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: U) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: U) => {
        this.models.push(this.deserialize(value));
      });
      this.trigger("change");
    });
  }
}
