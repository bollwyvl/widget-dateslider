import {DOMWidgetView} from "widgets";
import * as chroniton from "chroniton";
import * as d3 from "d3";

import "chroniton/chroniton-example.css";

export let DateSliderView = DOMWidgetView.extend({
  render: function() {
    this.d3 = d3.select(this.el);

    this.domainChanged();

    this.listenTo(this.model, "change:value", this.valueChanged);
    this.listenTo(this.model, "change:start", this.domainChanged);
    this.listenTo(this.model, "change:end", this.domainChanged);
  },

  initChroniton: function() {
    this.chroniton = chroniton()
      .on("change", (d: Date) => this.onChange(d));

    this.container && this.container.remove();
    this.container = this.d3.append("div");
  },

  valueChanged: function() {
    this.chroniton.setValue(new Date(this.m("value")));
  },

  domainChanged: function() {
    this.initChroniton();
    this.chroniton.domain([
      new Date(this.m("start")),
      new Date(this.m("end"))
    ]);
    this.valueChanged();
    this.callChroniton();
  },

  callChroniton: function() {
    this.container.call(this.chroniton);
    this.container.select(".chroniton").attr({height: 60});
  },

  onChange: function(value: Date) {
    let oldVal = this.m("value").slice(0, 23),
      newVal = value.toISOString().slice(0, 23);
    if (oldVal !== newVal) {
      this.m("value", newVal);
      this.touch();
    }
  },
  m: function(attr: string, val?: any) {
    return arguments.length === 1 ? this.model.get(attr) :
      [this.model.set(attr, val), this][1];
  }
});
