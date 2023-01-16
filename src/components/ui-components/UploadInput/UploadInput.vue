<template>
  <div class="upload-input">
    <label for="upload-input">
      <input
        id="upload-input"
        class="upload-input__input"
        type="file"
        @change="makePreviewImage"
        accept="image/*"
        ref="file"
      />
      <span class="upload-input__label">Выберите изображение</span>
    </label>
    <div v-if="previewImageData" class="preview">
      <img class="preview__img" :src="previewImageData" :alt="alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadInput",
  props: {
    preview: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "Изображение",
    },
  },
  computed: {
    previewImageData() {
      return this.preview;
    },
  },
  methods: {
    makePreviewImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.$emit("getImage", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  max-width: 200px;

  &__img {
    width: 100%;
  }
}

.upload-input {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
  }

  &__label {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    vertical-align: middle;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    background-color: #419152;
    line-height: 22px;
    height: 40px;
    padding: 10px 20px;
    box-sizing: border-box;
    border: none;
    margin: 0 0 20px 0;
    transition: background-color 0.2s;
  }
}

.upload-input__input:focus + .upload-input__label {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.upload-input:hover .upload-input__label {
  background-color: #59be6e;
}

.upload-input:active .upload-input__label {
  background-color: #2e703a;
}
</style>
