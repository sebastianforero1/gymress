import { html } from "../../util/dom.js";

export default () => html`
<section class="screen">
  <h2 class="screen-title">Próximas Horas</h2>
  <div class="list">
    <div class="item">7 PM - 8:30 PM</div>
    <div class="item">7 PM - 8:30 PM</div>
    <div class="item">7 PM - 8:30 PM</div>
  </div>
  <button class="back" data-go="home">↑</button>
</section>`;
