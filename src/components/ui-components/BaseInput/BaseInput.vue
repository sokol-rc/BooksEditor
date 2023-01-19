<template>
  <div>
    <label :for="labelId">
      {{ labelValue }}
    </label>
    <input
      :id="labelId"
      :class="{ 'form-control': true, error: hasError }"
      :name="name"
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
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      default: 'VueInputUi',
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    pattern: {
      type: RegExp,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    labelValue() {
      const { label } = this
      return this.required && this.label ? `${label} *` : label
    },
    labelId() {
      return `inputId${this.getRandomInt()}`
    },
  },
  watch: {
    value() {
      this.validate()
    },
  },
  methods: {
    getRandomInt() {
      const min = 1
      const max = 1000000000
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    validate() {
      if (typeof this.pattern !== 'undefined') {
        this.$emit('validate', {
          name: this.name,
          isValid: this.pattern.test(this.value),
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$error: 2px solid #ff0000;
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

.error {
  border: $error;
}
</style>
