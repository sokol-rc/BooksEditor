<template>
  <div>
    <label :for="labelId">
      {{ labelValue }}
    </label>
    <input
      :id="labelId"
      class="form-control"
      :value="value"
      :type="type"
      :required="required"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    id: {
      type: String,
      default: "VueInputUi",
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelValue() {
      const { label } = this;
      return this.required && this.label ? `${label} *` : label;
    },
    labelId() {
      return `inputId${this.getRandomInt()}`;
    },
  },
  methods: {
    getRandomInt() {
      const min = 1;
      const max = 1000000000;
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  width: 100%;
  border: 1px solid #b3b3b3;
  font-size: 17px;
  padding: 15px 12px;
  outline: none;
  &:focus {
    border: 1px solid #1e2221;
  }
  &.border-radius-start {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &.border-radius-end {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
