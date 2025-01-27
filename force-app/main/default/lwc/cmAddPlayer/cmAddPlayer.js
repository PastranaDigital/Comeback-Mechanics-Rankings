import { LightningElement } from "lwc";
import imageResource from "@salesforce/resourceUrl/CMImages";
import addPlayer from "@salesforce/apex/CM_Controller.addPlayer";

export default class CmAddPlayer extends LightningElement {
  deactiveButton = true;
  loading = false;
  success = false;
  failure = false;
  img_logo = imageResource + "/Images/Comeback_Mechanics_logo.png";

  handleChange(event) {
    this.success = false;
    this.failure = false;
    let str = event.target.value;
    // console.log(JSON.stringify(str));
    this.deactiveButton = str.length <= 1;
  }

  handleClick() {
    this.deactiveButton = true;
    const input = this.template.querySelector("lightning-input");
    // console.log(JSON.stringify(input));
    console.log(JSON.stringify(input.value));

    this.loading = true;
    addPlayer({ playerName: input.value })
      .then((result) => {
        this.message = `Successfully added ${input.value}`;
        this.error = undefined;
        this.success = true;
        console.log("result: ", this.message);
      })
      .catch((error) => {
        this.message = undefined;
        this.failure = true;
        this.error = error;
        console.error("error", JSON.stringify(this.error));
      })
      .finally(() => {
        input.value = "";
        this.loading = false;
      });
  }
}
