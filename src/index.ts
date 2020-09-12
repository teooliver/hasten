import { User } from "./models/User";

const user = new User({ id: 10 });

user.events.on("change", () => {
  console.log("change");
});

user.events.trigger("change");
